import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateDonateValidator from 'App/Validators/CreateDonateValidator'
import Donate from 'App/Models/Donate'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import Package from 'App/Models/Package'
import Api from 'App/Services/Api'
import mercadopago from 'mercadopago'

interface PicpayResponse {
  referenceId: string
  paymentUrl: string
  qrcode: {
    content: string
    base64: string
  }
  expiresAt: string
  status: string
  authorizationId: string
}

interface ResponseDonateItem {
  statusCode: number
  message: string
}

export default class DonatesController {
  public async paginate({ request, response, auth }: HttpContextContract) {
    const userId = await auth.use('api').user!.id
    const donates = await Donate.query()
      .where('userId', userId)
      .orderBy('id', 'desc')
      .preload('package')
      .preload('user')
      .paginate(request.input('page', 1), 10)
    return response.json({
      statusCode: 200,
      message: 'Doações listadas com sucesso',
      donates,
    })
  }
  public async create({ request, auth, response }: HttpContextContract) {
    await request.validate(CreateDonateValidator)
    const { packageId, method } = request.only(['packageId', 'method']) as {
      packageId: number
      method: string
    }
    const picpay = axios.create({
      baseURL: 'https://appws.picpay.com/ecommerce/public',
      headers: {
        'accept-encondig': 'gzip,deflate',
        'Content-Type': 'application/json',
        'x-picpay-token': Env.get('X_PICPAY_TOKEN'),
      },
    })
    const donate = new Donate()
    donate.packageId = packageId
    donate.method = method
    donate.userId = await auth.use('api').user!.id
    donate.status = 0
    await donate.save()
    const packageDonate = await Package.findByOrFail('id', packageId)
    if (method === 'picpay') {
      const responsePicpay = await picpay.post<PicpayResponse>(`/payments`, {
        referenceId: donate.id,
        callbackUrl: `${Env.get('CALLBACK_PICPAY')}`,
        expiresAt: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        returnUrl: `${Env.get('SITE')}/donation`,
        value: packageDonate.price.toString(),
        buyer: {
          firstName: 'Mário',
          lastName: 'da Silva',
          document: '104.322.357-60',
        },
      })
      if (responsePicpay.data) {
        donate.paymentUrl = responsePicpay.data.paymentUrl
        donate.qrcode = responsePicpay.data.qrcode.base64
        await donate.save()
        return response.json({
          statusCode: 200,
          message: 'Doação criada com sucesso',
        })
      }
      await donate.delete()
      return response.json({
        statusCode: 400,
        message: 'Erro ao criar doação',
      })
    } else if (method === 'mercado pago') {
      mercadopago.configure({
        access_token: Env.get('MP_ACCESS_TOKEN'),
      })
      const preference = {
        items: [
          {
            id: packageDonate.id,
            title: packageDonate.name,
            currency_id: 'BRL',
            picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
            category_id: 'donate',
            quantity: 1,
            unit_price: packageDonate.price,
          },
        ],
        back_urls: {
          success: Env.get('CALLBACK_MERCADOPAGO'),
          failure: Env.get('CALLBACK_MERCADOPAGO'),
          pending: Env.get('CALLBACK_MERCADOPAGO'),
        },
        notification_url: Env.get('CALLBACK_MERCADOPAGO'),
        external_reference: donate.id.toString(),
      }
      const responseMercadoPago = await mercadopago.preferences.create(preference)
      if (responseMercadoPago.body) {
        donate.paymentUrl = responseMercadoPago.body.init_point
        await donate.save()
        return response.json({
          statusCode: 200,
          message: 'Doação criada com sucesso',
        })
      }
      await donate.delete()
      return response.json({
        statusCode: 400,
        message: 'Erro ao criar doação',
      })
    }
    await donate.delete()
    return response.json({
      statusCode: 400,
      message: 'Erro ao criar doação',
    })
  }

  public async callbackPicpay({ request, response }: HttpContextContract) {
    const seller = request.header('x-seller-token')
    const data = request.only(['referenceId', 'authorizationId'])
    if (seller !== Env.get('X_PICPAY_SELLER')) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'unauthorized',
      })
    }
    const picpay = axios.create({
      baseURL: 'https://appws.picpay.com/ecommerce/public',
      headers: {
        'accept-encondig': 'gzip,deflate',
        'Content-Type': 'application/json',
        'x-picpay-token': Env.get('X_PICPAY_TOKEN'),
      },
    })
    const responsePicpay = await picpay.get<PicpayResponse>(`/payments/${data.referenceId}/status`)
    if (responsePicpay.data.authorizationId !== data.authorizationId) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }
    const donate = await Donate.findByOrFail('id', data.referenceId)
    await donate.load('user')
    await donate.load('package')
    if (responsePicpay.data.status === 'paid' || responsePicpay.data.status === 'complete') {
      if (donate.status !== 4 && donate.status !== 5) {
        return response.json({
          statusCode: 400,
          status: 'error',
          message: 'Unauthorized',
        })
      }
      donate.status = 4
      await donate.save()
      const responseApi = await Api.post('/users/package', {
        username: donate.user.username,
        donate: donate.package.donate + (donate.package.donate * donate.package.bonus) / 100,
        items: donate.package.items,
      })
      if (responseApi.data.statusCode === 200) {
        return response.json({
          statusCode: 200,
          status: 'success',
          message: 'success',
        })
      }
      donate.status = 8
      await donate.save()
    }
    return response.json({
      statusCode: 400,
      status: 'error',
      message: 'Unauthorized',
    })
  }
  public async callbackMercadopago({ request, response }: HttpContextContract) {
    const query = request.all()

    mercadopago.configure({
      access_token: Env.get('MP_ACCESS_TOKEN'),
    })

    if (!query) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }

    const paymentId = query.payment_id

    if (!paymentId) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }

    const data = await mercadopago.get(`/v1/payments/${paymentId}`)

    if (data.response.status !== 'approved') {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }

    const donate = await Donate.query()
      .where('id', parseInt(query.external_reference))
      .preload('user')
      .preload('package')
      .first()

    if (!donate) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }

    if (donate.status === 4 || donate.status === 5) {
      return response.json({
        statusCode: 400,
        status: 'error',
        message: 'Unauthorized',
      })
    }

    donate.status = 4
    await donate.save()

    const responseApi = await Api.post('/users/package', {
      username: donate.user.username,
      donate: donate.package.donate + (donate.package.donate * donate.package.bonus) / 100,
      items: donate.package.items,
    })

    if (responseApi.data.statusCode === 200) {
      return response.json({
        statusCode: 200,
        status: 'success',
        message: 'success',
      })
    }

    donate.status = 8
    await donate.save()
  }
}
