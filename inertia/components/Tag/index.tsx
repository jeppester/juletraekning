import React from 'react'
import classNames from 'classnames'
import './index.scss'
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon'

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  onClose?: () => void
}

export default function Tag(props: TagProps): JSX.Element {
  const { onClose, children, className, text, ...rest } = props

  const usedClassName = classNames(
    'Tag',
    {
      'Tag--closable': onClose,
    },
    className
  )

  return (
    <div className={usedClassName} {...rest}>
      {children}
      {text}
      {onClose && (
        <button className="Tag__close" onClick={onClose} aria-label="Close">
          <XMarkIcon />
        </button>
      )}
    </div>
  )
}
