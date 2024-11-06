import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon'
import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Button from '~/components/Button'
import ButtonClear from '~/components/ButtonClear'
import Input from '~/components/Input'
import Select from '~/components/Select'
import Tag from '~/components/Tag'
import MainLayout from '~/layouts/main'
import { InferPageProps } from '@adonisjs/inertia/types'
import DrawsController from '#controllers/draws_controller'
import Alert from '~/components/Alert'

let id = 0
const getId = () => ++id

export default function DrawCreate({ exceptions }: InferPageProps<DrawsController, 'create'>) {
  const [participantName, setParticipantName] = useState('')

  const { data, setData, post, processing, errors } = useForm({
    name: `Juletrækning ${new Date().getFullYear()}`,
    participants: [],
  } as {
    name: string
    participants: {
      id: number
      name: string
      exclude: number[]
    }[]
  })

  const createParticipant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const participant = { id: getId(), name: participantName, exclude: [] }

    setParticipantName('')
    setData((previousData) => ({
      ...previousData,
      participants: [...previousData.participants, participant],
    }))
  }

  const removeParticipant = (id: number) => {
    const nextParticipants = data.participants
      .filter((p) => p.id !== id)
      .map((p) => ({
        ...p,
        exclude: p.exclude.filter((otherId) => otherId !== id),
      }))

    setData({
      ...data,
      participants: nextParticipants,
    })
  }

  const handleExcludeSelect = (participantId: number, exclude: number[]) => {
    const nextParticipants = data.participants.map((p) =>
      p.id !== participantId
        ? p
        : {
            ...p,
            exclude: exclude,
          }
    )

    setData((previousData) => ({
      ...previousData,
      participants: nextParticipants,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/create')
  }

  return (
    <MainLayout>
      <Head title="Ny juletrækning" />
      <div className="mx-auto flex flex-col items-center max-w-2xl bg-secondary-600 my-20 px-10 py-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-neutral-400 text-center drop-shadow-md">
          Ny juletrækning
        </h1>

        <form onSubmit={createParticipant} className="mt-5">
          <label className="block">
            <h2 className="text-xl uppercase text-neutral-400 text-center drop-shadow-md">
              Opret deltagere
            </h2>
            <div className="flex mt-2">
              <Input
                onInput={({ currentTarget: { value } }) => setParticipantName(value)}
                size="md"
                value={participantName}
                className="rounded-l-md bg-secondary-800 text-secondary-800-contrast"
                placeholder="Skriv deltagerens navn"
              />
              <Button variant="primary" size="md" className="rounded-r-md -ml-px text-primary-900">
                Opret deltager
              </Button>
            </div>
          </label>
        </form>

        <form className="w-full" onSubmit={handleSubmit}>
          {data.participants.length > 0 && (
            <>
              <h2 className="mt-8 text-xl uppercase text-neutral-400 text-center drop-shadow-md">
                Deltagere
              </h2>

              <div className="mt-2 grid md:grid-cols-2 w-full gap-2">
                {data.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="relative px-5 pt-2 pb-4 bg-secondary-700 shadow-inner rounded-md"
                  >
                    <h2 className="text-lg text font-semibold text-neutral-400 text-center drop-shadow-md">
                      {participant.name}
                    </h2>

                    <ButtonClear
                      type="button"
                      onClick={() => removeParticipant(participant.id)}
                      variant="danger"
                      size="xs"
                      className="absolute top-0 right-0 rounded-none rounded-tr"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </ButtonClear>

                    <div className="flex w-full mt-2 items-center">
                      <Tag className="flex whitespace-nowrap py-2 items-center gap-1 rounded-none rounded-l shadow-inner">
                        Træk ikke
                      </Tag>

                      <Select
                        placeholder="Vælg deltagere"
                        classNames={{
                          container: 'grow',
                          control: 'rounded-none rounded-r',
                        }}
                        isMulti
                        onChange={(newValue) =>
                          handleExcludeSelect(
                            participant.id,
                            (newValue as Array<{ value: number }>).map(({ value }) => value)
                          )
                        }
                        value={participant.exclude
                          .map((id) => data.participants.find((p) => p.id === id)!)
                          .map((p) => ({ label: p.name, value: p.id }))}
                        options={data.participants
                          .filter((otherParticipant) => otherParticipant.id !== participant.id)
                          .map((otherParticipant) => ({
                            value: otherParticipant.id,
                            label: otherParticipant.name,
                          }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <label className="block mt-8">
            <p className="text-2xl uppercase text-neutral-400 text-center drop-shadow-md">
              Find eventuelt på et fedt navn:
            </p>
            <Input
              onInput={({ currentTarget: { value } }) => setData({ ...data, name: value })}
              size="md"
              value={data.name}
              className="mt-4 w-full py-5 text-3xl text-center rounded-l-md bg-secondary-800 text-secondary-800-contrast"
              placeholder="..."
            />
          </label>

          {Object.values(exceptions).map((exception) => (
            <Alert key={exception} variant="danger" className="mt-8 text-base whitespace-pre-wrap">
              {exception}
            </Alert>
          ))}

          <button className="w-full rounded-xl mt-10 px-20 py-6 block bg-primary-500 text-primary-900 text-2xl font-bold uppercase shadow-lg">
            <span className="drop-shadow-[1px_1px_rgba(256,256,256,0.4)]">Opret juletrækning</span>
          </button>
        </form>
      </div>
    </MainLayout>
  )
}
