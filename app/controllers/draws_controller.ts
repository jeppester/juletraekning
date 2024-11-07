import { db } from '#services/db'
import DrawService from '#services/draw_service'
import StoreDrawService from '#services/store_draw_service'
import { createDrawValidator } from '#validators/draws_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { jsonArrayFrom } from 'kysely/helpers/postgres'

export default class DrawsController {
  async index({ inertia }: HttpContext) {
    return inertia.render('draws/index')
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('draws/create', { test: 'test' })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(createDrawValidator)

    const numberErrors = [
      'Puljen var desværre helt tom, prøv at tilføje nogle deltagere',
      'Der skal være mindst tre deltagere.\nHvis du bare gerne vil købe en gave til dig selv, så må du gerne for os <3',
      'Det bliver lidt for forudsigeligt med kun to deltagere, tilføj venligst mindst én deltager mere',
    ]
    if (numberErrors[data.participants.length]) {
      session.flashErrors({
        DrawError: numberErrors[data.participants.length],
      })
      return response.redirect('back', true)
    }

    const drawResult = new DrawService(data.participants).perform()
    if (!drawResult.finalTickets) {
      session.flashErrors({
        DrawError: `Øv! der er nisser i teknikken!\nVi prøvede ${drawResult.attempts} gange, men fik ikke et gyldigt resultat...\n\nDu må gerne prøve igen, men overvej lige om der skal laves om på hvem der kan trække hvem`,
      })
      return response.redirect('back', true)
    }

    const storedDraw = await new StoreDrawService({
      draw: data,
      participants: data.participants,
      tickets: drawResult.finalTickets,
      rules: drawResult.rules,
    }).perform()

    return response.redirect(`/draws/${storedDraw.id}${storedDraw.pin}`)
  }

  /**
   * Show individual record
   */
  async show({ params, inertia }: HttpContext) {
    const id = params.idPin.slice(0, -10)
    const pin = params.idPin.slice(-10)

    const draw = await db()
      .selectFrom('draws')
      .where('id', '=', id)
      .where('pin', '=', pin)
      .select(['draws.name', 'draws.createdAt', 'draws.id', 'draws.pin'])
      .select((eb) =>
        jsonArrayFrom(
          eb
            .selectFrom('participants')
            .select([
              'participants.name',
              'participants.visits',
              'participants.id',
              'participants.pin',
            ])
            .select((eb) =>
              jsonArrayFrom(
                eb
                  .selectFrom('participants as excludeParticipant')
                  .innerJoin('rules', 'rules.targetId', 'excludeParticipant.id')
                  .whereRef('rules.participantId', '=', 'participants.id')
                  .select(['excludeParticipant.name'])
              ).as('exclude')
            )
            .whereRef('participants.drawId', '=', 'draws.id')
        ).as('participants')
      )
      .executeTakeFirstOrThrow()

    return inertia.render('draws/show', { draw })
  }
}
