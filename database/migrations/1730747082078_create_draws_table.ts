import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('draws')
    .addColumn('id', 'serial', (col) => col.primaryKey().notNull())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('pin', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull())
    .execute()

  await db.schema.createIndex('draws_pin_unique').on('draws').columns(['pin']).execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('draws').execute()
}
