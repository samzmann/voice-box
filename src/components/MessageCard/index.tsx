import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { padding } from '../../constants/padding'
import { color } from '../../constants/color'
import { MessageDocument } from '../../utils/database'
import ProgressBar from '../ProgressBar'
import SoundWave from '../SoundWave'

interface MessageCardProps {
  message: MessageDocument
}

const Container = styled.div`
  padding: ${padding.s}px;
  margin-bottom: ${padding.m}px;
`

const Bottom = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CodeLink = styled(Link)`
  font-size: 23px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const PlayButton = styled.div`
  padding-top: ${padding.s}px;
  padding-bottom: ${padding.s}px;
  padding-left: ${padding.m}px;
  padding-right: ${padding.m}px;
  border-style: solid;
  border-width: 2px;
  border-color: ${color.LightGrey};
  font-size: 16px;

  &:hover {
    background-color: ${color.LightGrey};
    border-color: ${color.Grey};
    color: ${color.Grey};
    cursor: pointer;
  }
`

const BottomLine = styled.div`
  padding-top: ${padding.m}px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: ${color.Grey};
`

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const audio = useRef(null)
  const progressBarRef = useRef(null)

  const toggleAudio = () => (isPlaying ? pause() : play())

  const play = async () => {
    if (audio.current) {
      await audio.current.play()
      setIsPlaying(true)
    }
  }

  const pause = async () => {
    if (audio.current) {
      await audio.current.pause()
      setIsPlaying(false)
    }
  }

  const audioEventListener = () => {
    if (audio.current) {
      audio.current.addEventListener('ended', () => {
        console.log('audio ended')
        setIsPlaying(false)
      })

      audio.current.addEventListener('timeupdate', () => {
        const progressPercent = Math.floor(
          (audio.current.currentTime / audio.current.duration) * 100
        )

        if (progressBarRef.current) {
          progressBarRef.current.style.width = progressPercent + '%'
        }
      })
    }
  }

  return (
    <Container>
      <audio
        ref={ref => {
          if (!audio.current) {
            audio.current = ref
            audioEventListener()
            setIsAudioInitialized(true)
          }
        }}
        // controls
        src={message.downloadURL}
      />
      {isAudioInitialized && <SoundWave waveform={message.waveform} />}
      <div style={{ height: padding.xs }} />
      <ProgressBar
        innerRef={ref => {
          progressBarRef.current = ref
        }}
      />
      <div style={{ height: padding.s }} />
      <Bottom>
        <CodeLink to={`/${message.shortId}`}>{message.shortId}</CodeLink>
        <PlayButton onClick={toggleAudio}>
          {isPlaying ? 'pause' : 'play'}
        </PlayButton>
      </Bottom>
      <BottomLine />
    </Container>
  )
}

export default MessageCard
