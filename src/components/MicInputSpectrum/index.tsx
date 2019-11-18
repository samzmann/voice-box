import React, { useRef } from 'react'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import audioSpectrum from '../../p5/audioSpectrum'

interface MicInputSpectrumProps {
  userHasInteracted: boolean
}

const MicInputSpectrum: React.FC<MicInputSpectrumProps> = ({
  userHasInteracted,
}) => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)
  return (
    <div style={{ height: 50 }} ref={canvasHolderRef}>
      <P5Wrapper
        sketch={audioSpectrum}
        parentDivRef={canvasHolderRef}
        userHasInteracted={userHasInteracted}
      />
    </div>
  )
}

export default MicInputSpectrum
