import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'guilds';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').unsigned().primary();
      table.string('name').notNullable();
      table.enum('kingdom', ['Adventure', 'Akelonia', 'Hekalotia']).nullable();
      table.integer('fame').unsigned().notNullable().defaultTo(0);
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
