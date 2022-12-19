import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Users from './Users';
import Package from './Package';

export default class Donate extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public packageId: number;

  @column()
  public method: string;

  @column()
  public status: number;

  @column()
  public merchantOrder: string;

  @column()
  public paymentId: string;

  @column()
  public qrcode: string;

  @column()
  public paymentUrl: string;

  @column()
  public authorizationId: string;

  @column()
  public referenceId: string;

  @belongsTo(() => Users, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof Users>;

  @belongsTo(() => Package, {
    foreignKey: 'packageId',
  })
  public package: BelongsTo<typeof Package>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
