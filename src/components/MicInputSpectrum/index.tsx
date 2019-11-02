import React, { useRef } from 'react'
import styled from 'styled-components'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import soundwave from '../../p5/soundwave'

const MicInputSpectrum: React.FC = () => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)
  return (
    <div
      style={{ height: 50, border: '1px solid yellow' }}
      ref={canvasHolderRef}
    >
      <P5Wrapper sketch={soundwave} parentDivRef={canvasHolderRef} />
    </div>
  )
}

export default MicInputSpectrum
