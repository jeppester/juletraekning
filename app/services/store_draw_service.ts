import { db } from './db.js'
import * as crypto from 'crypto'

type Data = {
  draw: { name: string }
  participants: {
    id: number
    name: string
    exclude: number[]
  }[]
  tickets: { participantId: number; drawnParticipantId: number }[]
  rules: { participantId: number; targetId: number }[]
}

export default class StoreDrawService {
  public data: Data

  constructor(data: Data) {
    this.data = data
  }

  private generatePin() {
    return crypto.randomBytes(5).toString('hex')
  }

  public async perform() {
    // Insert draw
    const draw = await db()
      .insertInto('draws')
      .values({
        name: this.data.draw.name,
        pin: this.generatePin(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow()

    // Insert participants
    const participantIdMap: Record<number, number> = {}
    const participants = await Promise.all(
      this.data.participants.map(async (p) => {
        const participant = await db()
          .insertInto('participants')
          .values({
            drawId: draw.id,
            name: p.name,
            pin: this.generatePin(),
          })
          .returningAll()
          .executeTakeFirstOrThrow()

        participantIdMap[p.id] = participant!.id
        return participant
      })
    )

    // Insert rules
    const rules = await Promise.all(
      this.data.rules.map(
        async (r) =>
          await db()
            .insertInto('rules')
            .values({
              drawId: draw.id,
              participantId: participantIdMap[r.participantId],
              targetId: participantIdMap[r.targetId],
            })
            .returningAll()
            .executeTakeFirstOrThrow()
      )
    )

    // Insert tickets
    const tickets = await Promise.all(
      this.data.tickets.map(
        async (t) =>
          await db()
            .insertInto('tickets')
            .values({
              drawId: draw.id,
              participantId: participantIdMap[t.participantId],
              drawnParticipantId: participantIdMap[t.drawnParticipantId],
            })
            .returningAll()
            .executeTakeFirstOrThrow()
      )
    )

    return {
      ...draw,
      participants,
      tickets,
      rules,
    }
  }
}
