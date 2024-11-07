import { Head, usePage } from '@inertiajs/react'
import MainLayout from '~/layouts/main'
import { InferPageProps } from '@adonisjs/inertia/types'
import DrawsController from '#controllers/draws_controller'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Card from '~/components/Card'

export default function DrawCreate(props: InferPageProps<DrawsController, 'show'>) {
  const page = usePage()
  const { draw, siteUrl } = props

  const partitipantLink = ({ id, pin }: { id: number; pin: string }) =>
    `${siteUrl}/tickets/${id}${pin}`

  return (
    <MainLayout>
      <Head title="Ny juletrækning" />
      <Card>
        <h1 className="text-2xl font-bold text-neutral-400 drop-shadow-md">
          Teknisserne har arbejdet på højtryk...
        </h1>
        <h1 className="text-6xl text-center animate-pulse font-bold text-neutral-400 drop-shadow-md">
          Og nu har vi resultatet!
        </h1>

        <h2 className="text-xl mt-8 uppercase text-neutral-400 drop-shadow-md">
          Find altid din lodtrækning her:
        </h2>
        <div className="flex mt-3 w-full">
          <Input
            className="grow shrink rounded-l-md"
            variant="default"
            type="url"
            size="lg"
            readOnly
            value={`${siteUrl}${page.url}`}
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
        <p className="text-center">
          Glæd dig til at overraske hver deltager med et helt personlig julelink!
          <br />
          <u>
            <strong>Og husk:</strong>
          </u>
        </p>

        <p className="text-center italic mt-4">
          Hvis du julens magi bevare vil <br />
          Kun deltageren linket skal sendes til... <br />
        </p>

        <p className="text-center mt-4">
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
                  className="rounded-l-md grow shrink"
                  variant="default"
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
              <p className="text-center italic mt-0.5 text-sm">
                {participant.exclude.length > 0
                  ? `Måtte ikke vælge: ${participant.exclude.map((e) => e.name).join(', ')}`
                  : `Måtte vælge alle`}
                {' - '}
                Besøgt {participant.visits} gang{participant.visits !== 1 && 'e'}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </MainLayout>
  )
}
