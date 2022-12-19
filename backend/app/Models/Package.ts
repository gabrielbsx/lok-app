import { DateTime } from 'luxon';
import { afterFetch, BaseModel, beforeFetch, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';

export interface ItemEffect {
  effect: number;
  value: number;
};

export interface Item {
  id: number;
  effects: ItemEffect[];
};

export default class Package extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
  })
  public slug: string;

  @column()
  public price: number;

  @column()
  public bonus: number;

  @column()
  public donate: number;

  @column()
  public items?: Item[] | string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
