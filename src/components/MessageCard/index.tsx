import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { color } from '../../constants/color'

interface MessageCardProps {
  message: any
}

const Container = styled.div`
  padding: ${padding.s}px;
  margin-bottom: ${padding.m}px;
`

const SoundWave = styled.div`
  height: 88px;
  border-style: dashed;
  border-width: 1px;
  border-color: ${color.LightGrey};
  margin-bottom: ${padding.s}px;
`

const Bottom = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const CodeText = styled.div`
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
  const audio = useRef(null)

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
        console.log(
          Math.floor(
            (audio.current.currentTime / audio.current.duration) * 100
          ) + '%'
        )
      })
    }
  }

  return (
    <Container>
      <SoundWave>
        <audio
          ref={ref => {
            if (!audio.current) {
              audio.current = ref
              audioEventListener()
            }
          }}
          controls
          src={message.downloadURL}
        />
      </SoundWave>
      <Bottom>
        <CodeText>{message.shortId}</CodeText>
        <PlayButton onClick={toggleAudio}>
          {isPlaying ? 'pause' : 'play'}
        </PlayButton>
      </Bottom>
      <BottomLine />
    </Container>
  )
}

export default MessageCard
