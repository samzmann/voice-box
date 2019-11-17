import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper'
import audioWaveform from '../../p5/audioWaveform'

interface SoundWaveProps {
  waveform: number[]
}

const SoundWave: React.FC<SoundWaveProps> = ({ waveform }) => {
  const canvasHolderRef = useRef<HTMLDivElement>(null)

  const [mockData, setMockData] = useState([])

  useEffect(() => {
    let isMounted = true
    const generateMockData = () => {
      const newData = []
      for (let i = 0; i < 1024; i++) {
        newData.push(Math.random() * 255)
      }
      isMounted && setMockData(newData)
    }

    generateMockData()
    return () => (isMounted = false)
  }, [])

  return (
    <div
      style={{ height: 50, border: '1px solid yellow' }}
      ref={canvasHolderRef}
    >
      <P5Wrapper
        sketch={audioWaveform}
        parentDivRef={canvasHolderRef}
        waveformData={waveform}
      />
    </div>
  )
}

export default SoundWave
