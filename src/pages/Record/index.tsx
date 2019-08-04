import React, { useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import firebase from '../../firebase'

// taken from https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
const recordAudio = () =>
  new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      let audioChunks: Array<Blob> = []

      mediaRecorder.addEventListener(
        'dataavailable',
        // @ts-ignore
        (event: { data: Blob }) => {
          console.log('event', event)
          audioChunks.push(event.data)
        }
      )

      const start = () => {
        audioChunks = []
        mediaRecorder.start()
      }

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks)
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)

            const play = () => {
              audio.play()
            }

            resolve({ audioBlob, audioUrl, play })
          })

          mediaRecorder.stop()
        })

      resolve({ start, stop })
    } catch (error) {
      console.log('error:', error)
      reject(error)
    }
  })

interface RecordPageProps extends RouteComponentProps {}

const Record: React.FC<RecordPageProps> = () => {
  const [recorder, setRecorder] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [audio, setAudio] = useState(null)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const initializeRecorder = async () => {
      const newRecorder = await recordAudio()
      setRecorder(newRecorder)
    }
    initializeRecorder()
  }, [])

  const handleRecord = async () => {
    if (isRecording) {
      setIsRecording(false)
      const newAudio = await recorder.stop()
      setAudio(newAudio)
    } else {
      setIsRecording(true)
      setAudio(null)
      setDuration(0)
      recorder.start()
    }
  }

  useEffect(() => {
    let interval: number
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(duration => duration + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, duration])

  const playRecording = () => {
    if (audio && audio.play) {
      audio.play()
    }
  }

  const saveRecording = () => {
    // const uploadTask = firebase.storage.ref().put()
  }

  return (
    <div>
      <h1>Record Page</h1>
      <button onClick={handleRecord}>
        {isRecording ? 'Stop' : 'Start'} recording
      </button>
      <button onClick={playRecording} disabled={isRecording}>
        Play recording
      </button>
      <button onClick={saveRecording} disabled={isRecording}>
        Save recording
      </button>
      <div>{duration}</div>
    </div>
  )
}

export default Record
