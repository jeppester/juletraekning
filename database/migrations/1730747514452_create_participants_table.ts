import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('participants')
    .addColumn('id', 'serial', (col) => col.primaryKey().notNull())
    .addColumn('draw_id', 'integer', (col) => col.notNull().references('draws.id'))
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('pin', 'varchar', (col) => col.notNull())
    .execute()

  await db.schema
    .createIndex('participants_pin_unique')
    .on('participants')
    .columns(['pin'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('participants').execute()
}
