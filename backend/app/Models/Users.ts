import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Character from './Character';
import Recovery from './Recovery';

type AccessLevel = 'User' | 'Moderator' | 'Admin';

export default class Users extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name?: string;

  @column()
  public email?: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public accessLevel: AccessLevel;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt?: DateTime;

  @hasMany(() => Character, {
    foreignKey: 'userId',
  })
  public characters: HasMany<typeof Character>;

  @hasMany(() => Recovery, {
    foreignKey: 'userId',
  })
  public recoveries: HasMany<typeof Recovery>;

  @hasMany(() => Users, {
    foreignKey: 'userId',
  })
  public user: HasMany<typeof Users>;

  @beforeSave()
  public static async hashPassword(users: Users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password);
    }
  }
}
