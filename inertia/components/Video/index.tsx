import { HTMLProps, useEffect, useRef, useState } from 'react'
import videoUrl from './juletraekning.mp4'
import playButtonUrl from './play-button.png'
import cn from 'classnames'

export default function Video({
  className,
  onComplete,
  drawTitle,
  ...props
}: HTMLProps<HTMLDivElement> & { onComplete: () => void; drawTitle: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const continueButtonTimeoutRef = useRef<NodeJS.Timeout>()
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playPause = () => {
    const { current: video } = videoRef
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  useEffect(() => {
    if (isPlaying) {
      continueButtonTimeoutRef.current = setTimeout(() => {
        setShowContinueButton(true)
      }, 10000)
    } else {
      clearTimeout(continueButtonTimeoutRef.current)
    }

    return () => clearTimeout(continueButtonTimeoutRef.current)
  }, [isPlaying])

  return (
    <div {...props} className={cn('relative', className)}>
      <video
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onComplete}
        ref={videoRef}
        className="absolute left-0 w-full top-0 h-full"
      >
        <source src={videoUrl}></source>
      </video>
      <div
        onClick={playPause}
        className="cursor-pointer group absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
      >
        {drawTitle && (
          <div className="text-center text-[3rem] md:text-[5rem] absolute font-bold text-neutral-400 drop-shadow-md top-20 px-6">
            {drawTitle}
          </div>
        )}
        {!isPlaying && (
          <img
            src={playButtonUrl}
            className="w-28 opacity-80 group-hover:opacity-100"
            alt="Play button"
          />
        )}
        {showContinueButton && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              onComplete()
            }}
            className="rounded-full absolute w-32 bg-black border-4 border-light bg-opacity-80 text-light bottom-20 px-6 py-3"
          >
            Videre
          </button>
        )}
      </div>
    </div>
  )
}
