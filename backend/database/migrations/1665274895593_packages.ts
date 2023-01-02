import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'packages';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.string('slug').notNullable().unique();
      table.string('name').notNullable();
      table.double('price').unsigned().notNullable();
      table.integer('bonus').unsigned().notNullable();
      table.bigInteger('donate').unsigned().notNullable();
      table.jsonb('items').notNullable().defaultTo([]);
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
