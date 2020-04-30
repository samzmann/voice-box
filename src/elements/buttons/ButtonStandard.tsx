import React from 'react'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { color } from '../../constants/color'
import { ButtonProps } from './index'

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-top: ${padding.s}px;
  padding-bottom: ${padding.s}px;
  padding-left: ${padding.m}px;
  padding-right: ${padding.m}px;
  border: 2px solid ${color.LightGrey};
  font-size: 16px;

  &:hover {
    background-color: ${color.LightGrey};
    border-color: ${color.Grey};
    color: ${color.Grey};
    cursor: pointer;
  }
`

// TODO: ButtonStandard text should be one line only, not sure if optional onClick is a good idea

export const ButtonStandard: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  label,
}) => <Container onClick={disabled ? null : onClick}>{label}</Container>
