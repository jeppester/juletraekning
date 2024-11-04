import React from 'react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon'
import { default as ReactSelect } from 'react-select'
import cn from 'classnames'
import './index.scss'

export type SelectProps = Omit<Parameters<ReactSelect>[0], 'classNames'> & {
  classNames?: {
    container?: string
    control?: string
    input?: string
    menu?: string
    option?: string
    multiValues?: string
  }
}

const Select = ({ classNames, ...props }: SelectProps) => {
  return (
    <ReactSelect
      unstyled
      components={{
        DropdownIndicator: () => <ChevronDownIcon className="Select__indicator" />,
        IndicatorSeparator: null,
      }}
      classNames={{
        container: () => cn('Select', classNames?.container),
        control: (state) => {
          const value = state.getValue()
          return cn(
            'Select__control',
            {
              'Select__control--focused': state.isFocused,
              'Select__control--disabled': state.isDisabled,
              'Select__control--multi': state.isMulti,
              'Select__control--filled': Boolean(value && value.length),
            },
            classNames?.control
          )
        },
        input: () => cn('Select__input', classNames?.input),
        menu: () => cn('Select__menu', classNames?.menu),
        option: (state) =>
          cn(
            'Select__option',
            {
              'Select__option--selected': state.isSelected,
              'Select__option--focused': state.isFocused,
            },
            classNames?.option
          ),
        multiValue: () => cn('Select__multi-value', classNames?.multiValues),
      }}
      {...props}
    />
  )
}

export default Select
