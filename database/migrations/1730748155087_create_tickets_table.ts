import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tickets')
    .addColumn('id', 'serial', (col) => col.primaryKey().notNull())
    .addColumn('draw_id', 'integer', (col) => col.notNull().references('draws.id'))
    .addColumn('participant_id', 'integer', (col) => col.notNull().references('participants.id'))
    .addColumn('drawn_participant_id', 'integer', (col) =>
      col.notNull().references('participants.id')
    )
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('tickets').execute()
}
