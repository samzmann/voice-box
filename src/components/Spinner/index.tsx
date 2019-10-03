import React from 'react'
import styled, { keyframes } from 'styled-components'
import { padding } from '../../constants/padding'
import { color } from '../../constants/color'

const Container = styled.div`
  width: ${padding.m}px;
  height: ${padding.m}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  line-height: 14px;
  font-size: 13px;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Inner = styled.div`
  width: 1px;
  height: ${padding.m}px;
  background-color: ${color.LightGrey};
  animation: ${rotate} 1s linear infinite;
`

const Spinner: React.FC = () => (
  <Container>
    <Inner />
  </Container>
)

export default Spinner
