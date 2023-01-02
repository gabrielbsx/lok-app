import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GuildmarkValidator from 'App/Validators/GuildmarkValidator'
import Application from '@ioc:Adonis/Core/Application'
import Character from 'App/Models/Character'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

export default class GuildsController {
  public async guildmark({ request, response }: HttpContextContract) {
    await request.validate(GuildmarkValidator)
    const name = `b0${1000000 + parseInt(request.input('guild', 0))}.bmp`
    const guildmark = request.file('guildmark')
    const guildmarkSelected = request.input('guildmarkSelected')
    if (guildmarkSelected) {
      const guildFile = readFileSync(Application.publicPath(`guildmark/${guildmarkSelected}`))
      writeFileSync(Application.publicPath(`img_guilds/${name}`), guildFile)
    }
    if (guildmark) {
      await guildmark!.move(Application.publicPath('img_guilds/'), {
        name,
        overwrite: true,
      })
    }
    return response.json({
      statusCode: 200,
      message: 'Guildmark enviada com sucesso',
    })
  }

  public async guild({ auth, response }: HttpContextContract) {
    const characters = await Character.query()
      .preload('guild')
      .where('user_id', auth.use('api').user!.id)
      .andWhere('guild_level', 9)
      .first()
    return response.json({
      statusCode: 200,
      message: 'Guild recebida com sucesso',
      characters,
    })
  }

  public async guildmarks({ response }: HttpContextContract) {
    const guildmarks = readdirSync(Application.publicPath('guildmark')).map((guildmark) => {
      if (guildmark === '.' || guildmark === '..') {
        return
      }
      return guildmark
    })
    return response.json({
      statusCode: 200,
      guildmarks,
    })
  }
}
