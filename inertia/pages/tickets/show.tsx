import { Head } from '@inertiajs/react'
import Video from '~/components/Video'
import { InferPageProps } from '@adonisjs/inertia/types'
import TicketsController from '#controllers/tickets_controller'
import { ForwardedRef, forwardRef, HTMLProps, useEffect, useRef, useState } from 'react'
import Button from '~/components/Button'
import backgroundImageUrl from '~/images/background.jpg'
import cn from 'classnames'

const PageText = forwardRef(
  (
    {
      className,
      children,
      textClassName,
      ...props
    }: HTMLProps<HTMLDivElement> & { textClassName?: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn('h-screen flex items-center justify-center snap-start', className)}
        {...props}
      >
        <h1
          className={cn(
            'text-6xl w-full break-words shrink text-center font-bold text-neutral-400 drop-shadow-md',
            textClassName
          )}
        >
          {children}
        </h1>
      </div>
    )
  }
)

export default function DrawCreate({ ticket }: InferPageProps<TicketsController, 'show'>) {
  const scrollToRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory'
    document.documentElement.style.backgroundImage =
      'linear-gradient(rgb(var(--color-secondary-800) / 1), rgb(var(--color-primary-600) / 1))'

    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  const onTextClick = ({ currentTarget }: { currentTarget: HTMLElement }) => {
    currentTarget.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })
  }

  const [showResult, setShowResult] = useState(false)

  return (
    <>
      <Head title="Se hvem du har trukket nu!" />

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

      <PageText
        onClick={onTextClick}
        ref={scrollToRef}
        className="bg-neutral-700"
        textClassName="animated-pulse"
      >
        Tillykke!
      </PageText>

      <PageText onClick={onTextClick} className="bg-secondary-700">
        Og glædelig jul!
      </PageText>

      <PageText onClick={onTextClick} className="bg-primary-700">
        "{ticket.name}"
      </PageText>

      <PageText onClick={onTextClick} className="bg-secondary-700">
        Du har trukket...
      </PageText>

      <PageText onClick={onTextClick} className="bg-black">
        ...
        <br />
        og hold nu fast
        <br />
        ...
      </PageText>

      <PageText onClick={onTextClick}>
        (<br />
        på gløggen og brunkagerne
        <br />)
      </PageText>

      <PageText onClick={onTextClick} className="bg-secondary-700">
        ...
        <br />
        For det bliver vildt!
        <br />
        ...
      </PageText>

      <PageText onClick={onTextClick} className="bg-primary-700">
        HER KOMMER:
      </PageText>

      <PageText onClick={onTextClick} className="bg-secondary-700">
        (trommehvirvel)
      </PageText>

      <PageText
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
        onClick={onTextClick}
        className="bg-cover bg-center"
        textClassName={cn('text-[5rem]', showResult ? 'animate-bounce' : '')}
      >
        {showResult ? (
          <>
            !!!!
            <br /> {ticket.drawnName.split('').join('. ').toUpperCase()}.
            <br />
            !!!!
          </>
        ) : (
          <Button onClick={() => setShowResult(true)} variant="warning" size="xl">
            Se resultatet
          </Button>
        )}
      </PageText>
    </>
  )
}
