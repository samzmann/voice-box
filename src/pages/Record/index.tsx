import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import firebase from '../../firebase'

interface RecordPageProps extends RouteComponentProps {}

const Record: React.FC<RecordPageProps> = () => {
  const [isRecording, setIsRecording] = useState(false)

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
    } else {
      setIsRecording(true)
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
      <button onClick={saveRecording} disabled={isRecording}>
        Save recording
      </button>
    </div>
  )
}

export default Record
