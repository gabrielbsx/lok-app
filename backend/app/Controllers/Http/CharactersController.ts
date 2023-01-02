import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Character from 'App/Models/Character';

export default class CharactersController {
  public async rankingBetaClosed({ request, response }: HttpContextContract) {
    const characters = await Character.query()
      .where('server', 'Beta Closed')
      .orderByRaw('CASE WHEN evolution = \'Mortal\' THEN 1 WHEN evolution = \'Arch\' THEN 2 WHEN evolution = \'Celestial\' THEN 3 WHEN evolution = \'SubCelestial\' THEN 4 END DESC')
      .orderBy('level', 'desc')
      .orderBy('sub_level', 'desc')
      .orderBy('experience', 'desc')
      .paginate(request.input('page', 1), 6);

    return response.json({
      statusCode: 200,
      characters,
    });
  }

  public async rankingBetaOpened({ request, response }: HttpContextContract) {
    const characters = await Character.query()
      .where('server', 'Beta Open')
      .orderByRaw('CASE WHEN evolution = \'Mortal\' THEN 1 WHEN evolution = \'Arch\' THEN 2 WHEN evolution = \'Celestial\' THEN 3 WHEN evolution = \'SubCelestial\' THEN 4 END DESC')
      .orderBy('level', 'desc')
      .orderBy('sub_level', 'desc')
      .orderBy('experience', 'desc')
      .paginate(request.input('page', 1), 6);

    return response.json({
      statusCode: 200,
      characters,
    });
  }

  public async rankingLive({ request, response }: HttpContextContract) {
    let order = request.input('order', 'evolution_order');
    if (!['deaths', 'kills', 'elo', 'evolution_order'].includes(order)) {
      order = 'evolution_order';
    }
    order = order === 'evolution_order' ? 'CASE WHEN evolution = \'Mortal\' THEN 1 WHEN evolution = \'Arch\' THEN 2 WHEN evolution = \'Celestial\' THEN 3 WHEN evolution = \'SubCelestial\' THEN 4 END DESC' : `${order} DESC`;
    const characters = await Character.query()
      .select('id', 'nick', 'level', 'class', 'evolution', 'guild_level', 'experience', 'sub_class', 'sub_experience', 'sub_level', 'kingdom', 'server', 'frags', 'guild_id', 'elo', 'kills', 'deaths')
      .where('server', 'Live')
      .andWhere('level', '<', 1000)
      .orderByRaw(order)
      .orderBy('level', 'desc')
      .orderBy('sub_level', 'desc')
      .orderBy('experience', 'desc')
      .paginate(request.input('page', 1), 6);

    return response.json({
      statusCode: 200,
      characters,
    });
  }

  public async items({ response }: HttpContextContract) {
    const characters = await Character.query()
      .select('nick', 'inventory', 'equipment')
      .where('server', 'Live')
      .andWhere('level', '<', 1000)
      .orderByRaw('CASE WHEN evolution = \'Mortal\' THEN 1 WHEN evolution = \'Arch\' THEN 2 WHEN evolution = \'Celestial\' THEN 3 WHEN evolution = \'SubCelestial\' THEN 4 END DESC')
      .orderBy('level', 'desc')
      .orderBy('sub_level', 'desc')
      .orderBy('experience', 'desc')
      .limit(1000);

    return response.json({
      statusCode: 200,
      characters,
    });
  }
}
