import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'donates';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id');
      table.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.bigInteger('package_id').unsigned().notNullable().references('id').inTable('packages').onDelete('CASCADE');
      table
        .tinyint('status', 1)
        .defaultTo(0)
        .comment('0: pendente, 1: análise, 2: cancelado, 3: estorno, 4: pago, 5: completado, 6: chargeback, 7: fraude');
      table.string('merchant_order').nullable();
      table.string('payment_id').nullable();
      table.string('authorization_id').nullable();
      table.string('reference_id').nullable();
      table.string('method').notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
