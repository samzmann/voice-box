import React, { useRef } from 'react'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import audioSpectrum from '../../p5/audioSpectrum'

const MicInputSpectrum: React.FC = () => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)
  return (
    <div
      style={{ height: 50, border: '1px solid yellow' }}
      ref={canvasHolderRef}
    >
      <P5Wrapper sketch={audioSpectrum} parentDivRef={canvasHolderRef} />
    </div>
  )
}

export default MicInputSpectrum
