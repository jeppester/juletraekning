import React from 'react'
import cn from 'classnames'
import classNames from 'classnames'

export default function Card({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto flex flex-col items-center max-w-2xl bg-secondary-800 text-secondary-800-contrast border-8 border-secondary-500 px-10 py-8 shadow-2xl',
        classNames
      )}
      {...props}
    />
  )
}
