import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recovery from 'App/Models/Recovery'
import Users from 'App/Models/Users'
import Api from 'App/Services/Api'
import AuthUserValidator from 'App/Validators/AuthUserValidator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import RecoveryTokenValidator from 'App/Validators/RecoveryTokenValidator'
import RecoveryUserValidator from 'App/Validators/RecoveryUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import { v4 } from 'uuid'

export type IAuth = {
  username: string
  password: string
}

export type ISignUp = {
  name?: string
  email?: string
  username: string
  password: string
}

export type IUser = {
  name?: string
  email?: string
  username: string
  password: string
}

export default class UsersController {
  public async auth({ request, response, auth }: HttpContextContract) {
    await request.validate(AuthUserValidator)
    const { username, password } = request.only(['username', 'password']) as IAuth
    const user = await Users.query().where('username', 'ilike', username).firstOrFail()
    const authenticated = await auth.use('api').generate(user)
    return response.json({
      statusCode: 200,
      message: 'Usuário autenticado com sucesso',
      auth: authenticated,
      user,
    })
  }

  public async register({ request, response, auth }: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const { username, password } = request.only(['username', 'password']) as ISignUp
    const { name, email } = request.body() as ISignUp
    try {
      const res = await Api.post('/users/register', { username, password })
      if (res.data.statusCode !== 200) {
        return response.json({
          statusCode: res.data.statusCode,
          message: res.data.message,
        })
      }
      const user = new Users()
      user.name = name
      user.email = email
      user.username = username
      user.password = password
      await user.save()
      const authenticated = await auth.use('api').generate(user)
      return response.json({
        statusCode: 201,
        message: 'Usuário criado com sucesso',
        auth: authenticated,
        user: user,
      })
    } catch (error) {
      console.log(error, 'its error')
      return response.json({
        statusCode: 400,
        message: 'Erro ao criar usuário',
      })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    const { name, password, tokenize } = request.all() as IUser & { tokenize: string }
    const user = await Users.findByOrFail('id', auth.use('api').user!.id)
    await Recovery.query().where('userId', user.id).where('token', tokenize).firstOrFail()
    let userData = { name, password }
    Object.keys(userData).forEach((key) =>
      userData[key] === undefined || userData[key] === '' ? delete userData[key] : null
    )
    user.merge(userData)
    if (password) {
      const responseApi = await Api.put('/users/update', { username: user.username, password })
      if (responseApi.data.statusCode !== 200) {
        return response.json({
          statusCode: responseApi.data.statusCode,
          message: responseApi.data.message,
        })
      }
    }
    await user.save()
    const authenticated = await auth.use('api').generate(user)
    return response.json({
      statusCode: 200,
      message: 'Usuário atualizado com sucesso',
      auth: authenticated,
      user,
    })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.json({
      statusCode: 200,
      message: 'Usuário desconectado com sucesso',
    })
  }

  public async recovery({ response, request }: HttpContextContract) {
    await request.validate(RecoveryUserValidator)
    const { username } = request.only(['username']) as { username: string }
    const user = await Users.query().where('username', username).firstOrFail()
    if (!user.email) {
      return response.json({
        statusCode: 400,
        message: 'Usuário não possui email cadastrado, entre em contato com o administrador',
      })
    }
    const token = v4()
    await Mail.use('smtp').send((message) => {
      message
        .from('no-reply@apologygame.com')
        .to(user.email as string)
        .subject('Recuperação de senha')
        .text(`Seu token para o usuário ${username} é: ${token}`)
    })
    const recovery = new Recovery()
    recovery.userId = user.id
    recovery.token = token
    recovery.save()
    return response.json({
      statusCode: 200,
      message: `Usuário recuperado com sucesso, verifique na caixa de entrada do seu e-mail ${user.email}`,
    })
  }

  public async recoveryToken({ response, request }: HttpContextContract) {
    await request.validate(RecoveryTokenValidator)
    const { username, tokenize, password } = request.only(['username', 'tokenize', 'password']) as {
      username: string
      tokenize: string
      password: string
    }
    const user = await Users.query().where('username', username).firstOrFail()
    user.password = password
    await Recovery.query().where('userId', user.id).where('token', tokenize).firstOrFail()
    const responseApi = await Api.put('/users/update', { username: user.username, password })
    if (responseApi.data.statusCode !== 200) {
      return response.json({
        statusCode: responseApi.data.statusCode,
        message: responseApi.data.message,
      })
    }
    await user.save()
    await Recovery.query().where('userId', user.id).delete()
    return response.json({
      statusCode: 200,
      message: 'Senha alterada com sucesso',
    })
  }

  public async token({ auth, response }: HttpContextContract) {
    const userId = await auth.use('api').user!.id
    console.log(userId)
    const { email, username } = await Users.findByOrFail('id', userId)
    const token = v4()
    await Mail.use('smtp').send((message) => {
      message
        .from('no-reply@apologygame.com')
        .to(email as string)
        .subject('Recuperação de senha')
        .text(`Seu token para o usuário ${username} é: ${token}`)
    })
    await Recovery.query().where('userId', userId).delete()
    const recovery = new Recovery()
    recovery.userId = userId
    recovery.token = token
    recovery.save()
    return response.json({
      statusCode: 200,
      message: `Token enviado para o e-mail ${email}`,
    })
  }

  public async refresh({ response, auth }: HttpContextContract) {
    const user = await Users.query()
      .where('id', await auth.use('api').user!.id)
      .firstOrFail()
    const authenticated = await auth.use('api').generate(user)
    return response.json({
      statusCode: 200,
      message: 'Usuário atualizado com sucesso',
      auth: authenticated,
      user,
    })
  }
}
