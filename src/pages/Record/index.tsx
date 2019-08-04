import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import firebase from '../../firebase'
import { firestoreAutoId } from '../../utils/ids'
import { recordAudio } from '../../utils/audio'

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
    console.log('audio', audio)
    const file: Blob = audio.audioBlob
    const path = `recordings/${firestoreAutoId()}`
    const metadata = {
      contentType: 'audio/mpeg-3',
    }

    const uploadTask = firebase.storage
      .ref()
      .child(path)
      .put(file, metadata)
      .then(snapshot => {
        console.log('Uploaded:', snapshot)
      })
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
