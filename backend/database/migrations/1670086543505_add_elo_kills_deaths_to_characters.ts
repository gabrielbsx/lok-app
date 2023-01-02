import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'characters'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('elo').nullable().defaultTo(0)
      table.integer('kills').nullable().defaultTo(0)
      table.integer('deaths').nullable().defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('elo')
      table.dropColumn('kills')
      table.dropColumn('deaths')
    })
  }
}
