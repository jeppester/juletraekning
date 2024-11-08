import { Head } from '@inertiajs/react'
import Video from '~/components/Video'
import { InferPageProps } from '@adonisjs/inertia/types'
import TicketsController from '#controllers/tickets_controller'
import { useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import backgroundImageUrl from '~/images/background.jpg'

export default function DrawCreate({ ticket }: InferPageProps<TicketsController, 'show'>) {
  const scrollToRef = useRef<HTMLDivElement>(null)

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
    <>
      <Head title="Se hvem du har trukket nu!" />
      <p className="text-sm w-full text-center fixed bottom-2 text-opacity-80 text-white">
        Du skal scrolle ned
      </p>
      <p className="text-sm w-full text-center fixed top-2 text-opacity-80 text-white">
        Du skal scrolle ned
      </p>

      <Video
        className="h-screen z-10 snap-start bg-cover bg-center"
        onComplete={() => {
          if (document.body.scrollTop === 0) {
            scrollToRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />

      <div
        ref={scrollToRef}
        className="h-screen flex items-center justify-center snap-start bg-neutral-700"
      >
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
          <h1 className="w-screen text-[5rem] break-words text-center animate-bounce uppercase font-bold text-neutral-400 drop-shadow-md">
            !!!!
            <br /> {ticket.drawnName.split('').join('. ')}.
            <br />
            !!!!
          </h1>
        ) : (
          <Button onClick={() => setShowResult(true)} variant="warning" size="lg">
            Se resultatet
          </Button>
        )}
      </div>
    </>
  )
}
