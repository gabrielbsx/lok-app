import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Character from './Character';

export default class Guild extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public kingdom: 'Adventure' | 'Akelonia' | 'Hekalotia';

  @column()
  public fame: number;

  @column()
  public city: string;

  @hasMany(() => Character, {
    foreignKey: 'guildId',
  })
  public characters: HasMany<typeof Character>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
