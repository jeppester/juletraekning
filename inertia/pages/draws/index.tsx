import { Head, Link } from '@inertiajs/react'
import Card from '~/components/Card'
import MainLayout from '~/layouts/main'

export default function DrawsIndex() {
  return (
    <MainLayout>
      <Head title="Opret din helt egen juletrækning i dag!" />
      <Card>
        <h1 className="text-5xl font-bold text-neutral-400 text-center drop-shadow-md">
          Opret din helt egen juletrækning i dag!
        </h1>

        <Link
          href="/create"
          className="rounded-xl mt-10 px-20 py-6 block bg-primary-500 text-neutral-100 text-2xl font-extrabold uppercase shadow-lg active:shadow-inner"
        >
          <span className="drop-shadow-[0px_1px_2px_rgba(0,0,0,0.4)]">Start her!</span>
        </Link>
      </Card>
    </MainLayout>
  )
}
