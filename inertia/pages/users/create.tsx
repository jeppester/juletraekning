import { Head } from '@inertiajs/react'
import { ChangeEvent, FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import MainLayout from '~/layouts/main'
import UserForm from '~/components/UserForm'

export default function UsersCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/users')
  }

  function handleChange(event: ChangeEvent<{ name: string; value: string }>) {
    setData(event.currentTarget.name as keyof typeof data, event.currentTarget.value)
  }

  return (
    <MainLayout>
      <Head title="New user" />

      <div className="container my-10">
        <h1 className="text-2xl">Create new user</h1>

        <UserForm
          data={data}
          processing={processing}
          errors={errors}
          action="/users"
          className="mt-4"
          method="post"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  )
}
