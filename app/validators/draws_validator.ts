import vine from '@vinejs/vine'

export const createDrawValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    participants: vine.array(
      vine.object({
        id: vine.number(),
        name: vine.string().minLength(3),
        exclude: vine.array(vine.number()),
      })
    ),
  })
)
