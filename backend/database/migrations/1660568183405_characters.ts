import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'characters';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable().primary();
      table.bigInteger('user_id').unsigned().nullable().references('id').inTable('users').onDelete('CASCADE');
      table.tinyint('slot').notNullable();
      table.string('nick').notNullable();
      table.integer('level').notNullable();
      table.enum('evolution', ['Mortal', 'Arch', 'Celestial', 'SubCelestial', 'Celestial/SubCelestial']).notNullable();
      table.enum('class', ['TransKnight', 'Foema', 'BeastMaster', 'Huntress']).notNullable();
      table.integer('guild_id').unsigned().nullable().references('id').inTable('guilds').onDelete('CASCADE');
      table.tinyint('guild_level').unsigned().nullable();
      table.bigInteger('experience').unsigned().notNullable();
      table.bigInteger('frags').notNullable();
      table.jsonb('inventory').notNullable().defaultTo([]);
      table.jsonb('equipment').notNullable().defaultTo([]);
      table.enum('kingdom', ['Adventure', 'Hekalotia', 'Akelonia']).nullable().defaultTo(null);
      table.enum('server', ['Beta Closed', 'Beta Open', 'Live']).notNullable().defaultTo('Live');
      
      table.enum('sub_class', ['TransKnight', 'Foema', 'BeastMaster', 'Huntress']).nullable();
      table.bigInteger('sub_experience').unsigned().nullable();
      table.integer('sub_level').unsigned().nullable();

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
