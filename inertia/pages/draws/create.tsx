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
import Card from '~/components/Card'

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
      <Card>
        <h1 className="text-3xl md:text-5xl font-bold text-neutral-400 text-center drop-shadow-md">
          Ny juletrækning
        </h1>

        <form onSubmit={createParticipant} className="mt-5">
          <label className="block">
            <h2 className="text-xl uppercase text-neutral-400 text-center drop-shadow-md">
              Opret deltagere
            </h2>
            <div className="flex flex-col md:flex-row mt-2">
              <Input
                onInput={({ currentTarget: { value } }) => setParticipantName(value)}
                size="lg"
                variant="default"
                value={participantName}
                className="max-md:rounded-t grow md:rounded-l-md"
                placeholder="Skriv deltagerens navn"
              />
              <Button
                disabled={participantName.length === 0}
                variant="primary"
                size="lg"
                className="max-md:rounded-b md:rounded-r-md"
              >
                Opret deltager
              </Button>
            </div>
          </label>
        </form>

        <form onSubmit={handleSubmit}>
          {data.participants.length > 0 && (
            <>
              <h2 className="mt-8 text-xl uppercase text-neutral-400 text-center drop-shadow-md">
                Deltagere
              </h2>

              <div className="mt-2 grid md:grid-cols-2 gap-2">
                {data.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="relative px-5 pt-3 pb-5 bg-primary-800 shadow-inner border-4 border-primary-500 rounded-md"
                  >
                    <h2 className="text-2xl text text-neutral-400 drop-shadow-md">
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

                    <div className="flex items-stretch flex-col md:flex-row mt-4">
                      <Tag className="bg-primary-600 max-md:w-full text-primary-600-contrast flex whitespace-nowrap py-2 items-center gap-1 rounded-none max-md:rounded-t md:rounded-l shadow-inner">
                        Træk ikke
                      </Tag>

                      <Select
                        placeholder="Vælg..."
                        classNames={{
                          container: 'grow w-auto',
                          control: 'rounded-none max-md:rounded-b md:rounded-r',
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
              variant="default"
              value={data.name}
              className="mt-4 w-full py-5 max-md:text-xl md:text-3xl text-center"
              placeholder="..."
              onFocus={({ currentTarget }) => currentTarget.select()}
            />
          </label>

          {Object.values(exceptions).map((exception) => (
            <Alert key={exception} variant="danger" className="mt-8 text-base whitespace-pre-wrap">
              {exception}
            </Alert>
          ))}

          <button className="w-full rounded-xl mt-10 px-2 py-6 block bg-primary-500 text-neutral-100 md:text-2xl font-bold uppercase shadow-lg">
            <span className="drop-shadow-[0px_1px_2px_rgba(0,0,0,0.4)]">Opret juletrækning</span>
          </button>
        </form>
      </Card>
    </MainLayout>
  )
}
