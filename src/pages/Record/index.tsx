import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps } from '@reach/router'
import firebase from '../../firebase'
import { firestoreAutoId, shortId } from '../../utils/ids'
import { recordAudio } from '../../utils/audio'
import { createMessage } from '../../utils/database'
import Loading from '../../components/Loading'
import MicInputSpectrum from '../../components/MicInputSpectrum'
import { ButtonStandard } from '../../elements/buttons/ButtonStandard'
import styled from 'styled-components'
import { padding } from '../../constants/padding'
import { PageContainer } from '../../elements/PageContainer'

enum UPLOAD_STATUS {
  WAITING,
  UPLOADING,
  COMPLETE,
  ERROR,
}

const ButtonRow = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${padding.s}px;
`

const ButtonContainer = styled.div`
  flex: 1;
`

const Space = styled.div`
  width: ${padding.s}px;
`

const CodeLink = styled(Link)`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

interface RecordPageProps extends RouteComponentProps {}

const Record: React.FC<RecordPageProps> = () => {
  const [recorder, setRecorder] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [userHasInteracted, setUserHasInteracted] = useState(false)
  const [audio, setAudio] = useState(null)
  const [duration, setDuration] = useState(0)
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.WAITING)
  const [messageShortId, setMessageShortId] = useState(null)

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
      !userHasInteracted && setUserHasInteracted(true)
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

  const handlePlay = () => {
    if (audio && audio.play) {
      audio.play()
    }
  }

  const handleSave = async () => {
    try {
      setUploadStatus(UPLOAD_STATUS.UPLOADING)

      const file: Blob = audio.audioBlob
      const path = `recordings/${firestoreAutoId()}`
      const metadata = {
        contentType: file.type,
      }

      const uploadTask = firebase.storage
        .ref()
        .child(path)
        .put(file, metadata)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload progress: ${progress}%`)
        },
        error => {
          console.log('Upload error:', error)
          setUploadStatus(UPLOAD_STATUS.ERROR)
        },
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()

          console.log(uploadTask.snapshot.ref)

          const newShortId = shortId()

          await createMessage({
            shortId: newShortId,
            downloadURL,
            storageFullPath: uploadTask.snapshot.ref.fullPath,
            isAudioProcessing: true,
            duration: audio.duration,
          })

          setMessageShortId(newShortId)
          setUploadStatus(UPLOAD_STATUS.COMPLETE)
        }
      )
    } catch (error) {
      console.log('Error saving message:', error)
    }
  }

  return (
    <PageContainer>
      <h1>Record Page</h1>
      <MicInputSpectrum userHasInteracted={userHasInteracted} />
      <ButtonRow>
        <ButtonContainer>
          <ButtonStandard onClick={handleRecord}>
            {isRecording ? 'finish' : 'record'}
          </ButtonStandard>
        </ButtonContainer>
        <Space />
        <ButtonContainer>
          <ButtonStandard onClick={handlePlay} disabled={isRecording}>
            play
          </ButtonStandard>
        </ButtonContainer>
        <Space />
        <ButtonContainer>
          <ButtonStandard onClick={handleSave} disabled={isRecording}>
            save
          </ButtonStandard>
        </ButtonContainer>
      </ButtonRow>
      <div>{duration}</div>
      {uploadStatus === UPLOAD_STATUS.UPLOADING && <Loading />}
      {uploadStatus === UPLOAD_STATUS.COMPLETE && (
        <p>
          Share your message with this id:{' '}
          <CodeLink to={`/${messageShortId}`}>{messageShortId}</CodeLink>
        </p>
      )}
    </PageContainer>
  )
}

export default Record
