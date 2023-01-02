import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Users from './Users';
import Guild from './Guild';

export interface ItemEffect {
  effect: number;
  value: number;
};

export interface Item {
  id: number;
  slot: number;
  effects: ItemEffect[];
};

export type Class = 'TransKnight' | 'Foema' | 'BeastMaster' | 'Huntress';

export type Evolution = 'Mortal' | 'Arch' | 'Celestial' | 'SubCelestial' | 'Celestial/SubCelestial';

export default class Character extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId?: number;
  
  @column()
  public guildId: number;

  @column()
  public slot: number;
  
  @column()
  public nick: string;

  @column()
  public level: number;

  @column()
  public class: Class;

  @column()
  public evolution: Evolution;

  @column()
  public guildLevel: number;

  @column()
  public experience: number;

  @column()
  public subClass: Class;

  @column()
  public subExperience: number;

  @column()
  public subLevel: number;

  @column()
  public kills: number;

  @column()
  public deaths: number;

  @column()
  public elo: number;

  @column()
  public kingdom?: 'Akelonia' | 'Hekalotia' | 'Adventure';

  @column()
  public server: 'Beta Closed' | 'Beta Open' | 'Live';

  @column()
  public frags: number;

  @column()
  public inventory?: Item[];

  @column()
  public equipment?: Item[];

  @belongsTo(() => Users, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof Users>;

  @belongsTo(() => Guild, {
    foreignKey: 'guildId',
  })
  public guild: BelongsTo<typeof Guild>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
