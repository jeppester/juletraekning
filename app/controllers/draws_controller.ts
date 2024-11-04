import { db } from '#services/db'
import DrawService from '#services/draw_service'
import StoreDrawService from '#services/store_draw_service'
import { createDrawValidator } from '#validators/draws_validator'
import type { HttpContext } from '@adonisjs/core/http'

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
      .selectAll()
      .executeTakeFirstOrThrow()

    return inertia.render('draws/show', { draw })
  }
}
