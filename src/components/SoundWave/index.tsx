import React, { useRef } from 'react'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import audioWaveform from '../../p5/audioWaveform'

interface SoundWaveProps {
  waveform: number[]
}

const SoundWave: React.FC<SoundWaveProps> = ({ waveform }) => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)
  return (
    <div style={{ height: 50 }} ref={canvasHolderRef}>
      <P5Wrapper
        sketch={audioWaveform}
        parentDivRef={canvasHolderRef}
        waveformData={waveform}
      />
    </div>
  )
}

export default SoundWave
