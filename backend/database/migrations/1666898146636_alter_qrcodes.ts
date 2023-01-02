import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'donates';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('qrcode').nullable().alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('qrcode').nullable().alter();
    });
  }
}
