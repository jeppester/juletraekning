import { Head } from '@inertiajs/react'
import MainLayout from '~/layouts/main'

export default function UsersIndex() {
  return (
    <MainLayout>
      <Head title="Home" />
      <div className="container mx-auto">
        <h1 className="text-xl mt-10">Juletrækning</h1>
      </div>
    </MainLayout>
  )
}
