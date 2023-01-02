import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'news'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('thumbnail', 500).nullable().after('category')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('thumbnail')
    })
  }
}
