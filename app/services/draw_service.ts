import { createDrawValidator } from '#validators/draws_validator'
import { Infer } from '@vinejs/vine/types'

const takeRandom = <A extends any[]>(array: A): A[number] => {
  const index = Math.floor(Math.random() * array.length)
  const taken = array[index]
  array.splice(index, 1)

  return taken
}

type Participants = Infer<typeof createDrawValidator>['participants']

export default class DrawService {
  public participants: Participants = []

  constructor(participants: Participants) {
    this.participants = participants
  }

  public perform() {
    // Attempt draw
    const rules = this.participants.reduce(
      (res, { id, exclude }) => {
        return res.concat(exclude.map((targetId) => ({ participantId: id, targetId })))
      },
      [] as { participantId: number; targetId: number }[]
    )

    let attempts = 0
    let finalTickets = null
    do {
      // Pick tickets
      ++attempts
      const pool = this.participants.map((p) => p.id)
      const tickets = this.participants.map((p) => ({
        participantId: p.id,
        drawnParticipantId: takeRandom(pool),
      }))

      // Ensure that no rules where broken
      const rulesBroken = rules.some((rule) =>
        tickets.some(
          (t) => t.participantId === rule.participantId && t.drawnParticipantId === rule.targetId
        )
      )
      if (rulesBroken) continue

      // Ensure that no one drew themselves
      const selfDraw = tickets.some((t) => t.drawnParticipantId == t.participantId)
      if (selfDraw) continue

      // If we did not continue, the tickets are valid! lets break the loop
      finalTickets = tickets
      break
    } while (attempts < 100)

    return { rules, finalTickets, attempts }
  }
}
