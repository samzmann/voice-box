import React from 'react'

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
  label: string
}

export * from './ButtonStandard'
