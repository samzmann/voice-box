import React from 'react'
import styled from 'styled-components'
import { color } from '../../constants/color'
import { padding } from '../../constants/padding'

interface ProgressBarProps {
  innerRef(ref: HTMLDivElement): void
}

const Container = styled.div`
  height: ${padding.s}px;
  width: 100%;
  background-color: ${color.Grey};
`

const Progress = styled.div`
  height: 100%;
  width: 0%;
  background-color: ${color.LightGrey};
`

const ProgressBar: React.FC<ProgressBarProps> = ({ innerRef }) => (
  <Container>
    <Progress ref={innerRef} />
  </Container>
)

export default ProgressBar
