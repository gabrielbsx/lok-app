import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'guilds'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('city').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('city')
    })
  }
}
