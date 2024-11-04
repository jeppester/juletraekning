import { Head } from '@inertiajs/react'
import MainLayout from '~/layouts/main'
import { InferPageProps } from '@adonisjs/inertia/types'
import DrawsController from '#controllers/draws_controller'

export default function DrawCreate({ draw }: InferPageProps<DrawsController, 'show'>) {
  return (
    <MainLayout>
      <Head title="Ny juletrækning" />
      <div className="mx-auto flex flex-col items-center max-w-2xl bg-secondary-600 my-20 px-10 py-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-neutral-400 text-center drop-shadow-md">
          Nisserne er ellevilde!
        </h1>
        <p>{draw.pin}</p>
        <p>{draw.name}</p>
      </div>
    </MainLayout>
  )
}
