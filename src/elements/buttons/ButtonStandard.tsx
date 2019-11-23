import React from 'react'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { color } from '../../constants/color'

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-top: ${padding.s}px;
  padding-bottom: ${padding.s}px;
  padding-left: ${padding.m}px;
  padding-right: ${padding.m}px;
  border-style: solid;
  border-width: 2px;
  border-color: ${color.LightGrey};
  font-size: 16px;

  &:hover {
    background-color: ${color.LightGrey};
    border-color: ${color.Grey};
    color: ${color.Grey};
    cursor: pointer;
  }
`

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
}

export const ButtonStandard: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
}) => <Container onClick={disabled ? null : onClick}>{children}</Container>
