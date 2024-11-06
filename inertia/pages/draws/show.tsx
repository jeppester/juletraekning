import { Head, usePage } from '@inertiajs/react'
import MainLayout from '~/layouts/main'
import { InferPageProps } from '@adonisjs/inertia/types'
import DrawsController from '#controllers/draws_controller'
import Button from '~/components/Button'
import Input from '~/components/Input'

export default function DrawCreate(props: InferPageProps<DrawsController, 'show'>) {
  const page = usePage()
  const { draw, siteUrl } = props

  const partitipantLink = ({ id, pin }: { id: number; pin: string }) =>
    `${siteUrl}/tickets/${id}${pin}`

  return (
    <MainLayout>
      <Head title="Ny juletrækning" />
      <div className="mx-auto text-center flex flex-col items-center max-w-2xl bg-secondary-600 text-secondary-600-contrast my-20 px-10 py-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold text-neutral-400 drop-shadow-md">
          Teknisserne har arbejdet på højtryk...
        </h1>
        <h1 className="text-6xl animate-pulse font-bold text-neutral-400 drop-shadow-md">
          Og nu har vi resultatet!
        </h1>

        <h2 className="text-xl mt-8 uppercase text-neutral-400 drop-shadow-md">
          Find altid din lodtrækning her:
        </h2>
        <div className="flex mt-3 w-full">
          <Input
            className="bg-secondary-800 grow text-secondary-800-contrast rounded-l-md"
            type="url"
            size="lg"
            readOnly
            value={`${siteUrl}/${page.url}`}
          />
          <Button
            className="rounded-r-md"
            size="lg"
            variant="primary"
            onClick={() => navigator.clipboard.writeText(`${siteUrl}/${page.url}`)}
          >
            Kopiér
          </Button>
        </div>
        <p className="mt-0.5">
          <strong>NB:</strong> Overvej at sende linket til dig selv, så du altid kan finde det
        </p>

        <h2 className="text-xl mt-8 uppercase text-neutral-400 drop-shadow-md">
          Magiske julelinks
        </h2>
        <p className="">
          Glæd dig til at overraske hver deltager med et helt personlig julelink!
          <br />
          <u>
            <strong>Og husk:</strong>
          </u>
        </p>

        <p className="italic mt-4">
          Hvis du julens magi bevare vil <br />
          Kun deltageren linket skal sendes til... <br />
        </p>

        <p className="mt-4">
          (det betyder at du kun skal sende de rigtige links til de rigtige modtagere og at du ikke
          må smugkigge, dit lille nissesvin)
        </p>

        <div className="mt-8 w-full space-y-4">
          {draw.participants.map((participant) => (
            <div key={participant.id}>
              <h2 className="text-lg text font-semibold text-neutral-400 text-center drop-shadow-md">
                {participant.name}
              </h2>

              <div className="flex mt-1">
                <Input
                  className="bg-secondary-800 grow text-secondary-800-contrast rounded-l-md"
                  type="url"
                  size="lg"
                  readOnly
                  value={partitipantLink(participant)}
                />
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-r-md"
                  onClick={() => navigator.clipboard.writeText(partitipantLink(participant))}
                >
                  Kopiér
                </Button>
              </div>
              <p className="italic mt-0.5 text-sm">
                {participant.exclude.length > 0
                  ? `Måtte ikke vælge: ${participant.exclude.map((e) => e.name).join(', ')}`
                  : `Måtte vælge alle`}
                {' - '}
                Besøgt {participant.visits} gang{participant.visits !== 1 && 'e'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
