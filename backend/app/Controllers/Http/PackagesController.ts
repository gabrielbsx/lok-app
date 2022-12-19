import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PackageModel from 'App/Models/Package'
import CreatePackageValidator from 'App/Validators/CreatePackageValidator'
import UpdatePackageValidator from 'App/Validators/UpdatePackageValidator'

interface Effect {
  effect: number
  value: number
}

interface Item {
  id: number
  name: string
  effects: Effect[]
}

interface Package {
  name: string
  price: number
  bonus: number
  donate: number
  items: any
}

export default class PackagesController {
  private limit = 10

  public async create({ response, request }: HttpContextContract) {
    await request.validate(CreatePackageValidator)

    const { name, price, bonus, donate, items } = request.only([
      'name',
      'price',
      'bonus',
      'donate',
      'items',
    ]) as Package

    const packageDonate = new PackageModel()

    packageDonate.name = name
    packageDonate.price = price
    packageDonate.bonus = bonus
    packageDonate.donate = donate
    packageDonate.items = JSON.stringify(items) || JSON.stringify([])

    await packageDonate.save()

    return response.json({
      statusCode: 201,
      message: 'Pacote criado com sucesso',
      package: packageDonate,
    })
  }

  public async all({ request, response }: HttpContextContract) {
    const packages = await PackageModel.query()
      .orderBy('name', 'desc')
      .orderBy('updatedAt', 'desc')
      .orderBy('id', 'desc')
      .paginate(request.input('page', 1), request.input('limit', this.limit))

    return response.json({
      packages: packages.serialize(),
    })
  }

  public async getBySlug({ params, response }: HttpContextContract) {
    const { slug } = params as { slug: string }

    const packages = await PackageModel.findBy('slug', slug)

    return response.json({
      package: packages,
    })
  }

  public async delete({ params, response }: HttpContextContract) {
    const { slug } = params as { slug: string }

    const packages = await PackageModel.findBy('slug', slug)

    if (!packages) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Pacote não encontrada',
      })
    }

    await packages.delete()

    return response.json({
      statusCode: 200,
      message: 'Pacote deletado com sucesso',
    })
  }

  public async update({ request, params, response }: HttpContextContract) {
    await request.validate(UpdatePackageValidator)

    const { slug } = params
    let packageData = request.only(['name', 'price', 'donate', 'bonus', 'items']) as Package

    const packages = await PackageModel.findByOrFail('slug', slug)

    Object.keys(packageData).forEach((key) =>
      packageData[key] === undefined || packageData[key] === '' ? delete packageData[key] : null
    )

    packageData.items = JSON.stringify(packageData.items) || JSON.stringify([])

    packages.merge(packageData)

    await packages.save()

    return response.json({
      statusCode: 200,
      message: 'Pacote atualizado com sucesso',
      package: packages,
    })
  }
}
