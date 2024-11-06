import { db } from '#services/db'
import type { HttpContext } from '@adonisjs/core/http'
import { isbot } from 'isbot'

export default class DrawsController {
  /**
   * Show individual record
   */
  async show({ request, params, inertia }: HttpContext) {
    const id = params.idPin.slice(0, -10)
    const pin = params.idPin.slice(-10)

    const ticket = await db()
      .selectFrom('participants')
      .where('participants.id', '=', id)
      .where('participants.pin', '=', pin)
      .innerJoin('tickets', 'participants.id', 'tickets.participantId')
      .innerJoin('participants as targets', 'targets.id', 'tickets.drawnParticipantId')
      .select(['participants.name', 'targets.name as drawnName'])
      .executeTakeFirstOrThrow()

    // Add visit - if not a bot
    if (!isbot(request.header('User-Agent'))) {
      await db()
        .updateTable('participants')
        .set((eb) => ({ visits: eb('visits', '+', 1) }))
        .where('id', '=', id)
        .where('pin', '=', pin)
        .executeTakeFirstOrThrow()
    }

    return inertia.render('tickets/show', { ticket })
  }
}
