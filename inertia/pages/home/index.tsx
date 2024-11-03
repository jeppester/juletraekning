import { Head } from '@inertiajs/react'
import Button from '~/components/Button'
import Field from '~/components/Field'
import Input from '~/components/Input'
import MainLayout from '~/layouts/main'

export default function UsersIndex() {
  return (
    <MainLayout>
      <Head title="Home" />
      <div className="mx-auto max-w-xl bg-neutral-500 my-20 px-10 py-8 rounded-3xl drop-shadow-2xl">
        <h1 className="text-5xl font-bold text-neutral-500-contrast">
          Opret din helt egen juletrækning i dag!
        </h1>

        <Button variant="primary" size="xl">
          Start her!
        </Button>
      </div>
    </MainLayout>
  )
}
