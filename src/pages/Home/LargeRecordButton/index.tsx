import React from 'react'
import styled from 'styled-components'

import { color } from '../../../constants/color'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100px;
  background-color: ${color.Red};
  border-radius: 15px;
  border: none;
  box-shadow: 0px 2px 0px black;

  &:hover {
    opacity: 0.8;
  }
`

const Circle = styled.div`
  width: 70px;
  height: 70px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${color.Black};
`

const LargeRecordButton: React.FC = () => {
  return (
    <Container>
      <Circle />
    </Container>
  )
}

export default LargeRecordButton
