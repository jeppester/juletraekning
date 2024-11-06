import { Head } from '@inertiajs/react'
import MainLayout from '~/layouts/main'
import { InferPageProps } from '@adonisjs/inertia/types'
import TicketsController from '#controllers/tickets_controller'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'

export default function DrawCreate({ ticket }: InferPageProps<TicketsController, 'show'>) {
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory'
    document.documentElement.style.backgroundColor = 'rgb(var(--color-neutral-700) / 1)'

    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  const [showResult, setShowResult] = useState(false)

  return (
    <MainLayout>
      <Head title="Se hvem du har trukket nu!" />
      <p className="text-sm w-full text-center fixed bottom-2 text-opacity-80 text-white">
        Du skal scrolle ned
      </p>
      <p className="text-sm w-full text-center fixed top-2 text-opacity-80 text-white">
        Du skal scrolle ned
      </p>

      <div className="h-screen flex items-center justify-center snap-start bg-neutral-700">
        <h1 className="text-6xl animate-pulse text-center font-bold text-neutral-400 drop-shadow-md">
          Tillykke!
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-secondary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          Og glædelig jul!
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-primary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          "{ticket.name}"
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-secondary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          Du har trukket...
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-black">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          ...
          <br />
          og hold nu fast
          <br />
          ...
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          (<br />
          på gløggen og brunkagerne
          <br />)
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-secondary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          ...
          <br />
          For det bliver vildt!
          <br />
          ...
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-primary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          HER KOMMER:
        </h1>
      </div>

      <div className="h-screen flex items-center justify-center snap-start bg-secondary-700">
        <h1 className="text-6xl text-center font-bold text-neutral-400 drop-shadow-md">
          (trommehvirvel)
        </h1>
      </div>

      <div className="min-h-screen flex items-center justify-center snap-start">
        {showResult ? (
          <h1 className="w-screen text-[10rem] break-words text-center animate-bounce uppercase font-bold text-neutral-400 drop-shadow-md">
            !!!!
            <br /> {ticket.drawnName.split('').join('. ')}.
            <br />
            !!!!
          </h1>
        ) : (
          <Button onClick={() => setShowResult(true)} variant="primary" size="lg">
            Se resultatet
          </Button>
        )}
      </div>
    </MainLayout>
  )
}
