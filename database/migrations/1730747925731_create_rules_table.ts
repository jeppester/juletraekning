import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('rules')
    .addColumn('id', 'serial', (col) => col.primaryKey().notNull())
    .addColumn('draw_id', 'integer', (col) => col.notNull().references('draws.id'))
    .addColumn('participant_id', 'integer', (col) => col.notNull().references('participants.id'))
    .addColumn('target_id', 'integer', (col) => col.notNull().references('participants.id'))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('rules').execute()
}
