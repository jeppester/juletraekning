import { Head, Link } from '@inertiajs/react'
import MainLayout from '~/layouts/main'

export default function DrawsIndex() {
  return (
    <MainLayout>
      <Head title="Opret din helt egen juletrækning i dag!" />
      <div className="mx-auto flex flex-col items-center max-w-xl bg-secondary-600 px-10 py-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-neutral-400 text-center drop-shadow-md">
          Opret din helt egen juletrækning i dag!
        </h1>

        <Link
          href="/create"
          className="rounded-xl mt-10 px-20 py-6 block bg-primary-500 text-neutral-900 text-2xl font-extrabold uppercase shadow-lg"
        >
          <span className="drop-shadow-sm">Start her!</span>
        </Link>
      </div>
    </MainLayout>
  )
}
