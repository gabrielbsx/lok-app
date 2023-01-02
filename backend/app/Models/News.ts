import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Users from './Users'

export type Category =
  | 'Notícia'
  | 'Novidade'
  | 'Notas de Atualização'
  | 'Manutenção Emergencial'
  | 'Manutenção Semanal'
  | 'Evento'

export interface INews {
  id: number
  slug: string
  title: string
  description: string
  content: string
  category: Category
}

export default class News extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title', 'description'],
  })
  public slug: string

  @column()
  public description: string

  @column()
  public content: string

  @column()
  public category: Category

  @column()
  public thumbnail: string

  @belongsTo(() => Users, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof Users>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  public updatedAt: DateTime
}
