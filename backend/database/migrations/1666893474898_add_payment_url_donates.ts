import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'donates';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('payment_url').nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('payment_url');
    });
  }
}
