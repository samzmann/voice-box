import React, { useRef } from 'react'
import styled from 'styled-components'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import soundwave from '../../p5/soundwave'

interface SoundWaveProps {
  audio: HTMLAudioElement
}

const SoundWave: React.FC<SoundWaveProps> = ({ audio }) => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)

  return (
    <div
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'yellow',
        height: 50,
      }}
      ref={canvasHolderRef}
    >
      <P5Wrapper
        sketch={soundwave}
        // audio={audio}
        parentDivRef={canvasHolderRef}
      />
    </div>
  )
}

export default SoundWave
