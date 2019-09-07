import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import firebase from '../../firebase'

interface MessagePageProps extends RouteComponentProps {
  messageId?: string
}

const Message: React.FC<MessagePageProps> = ({ messageId }) => {
  const [loading, setLoading] = useState(false)
  const [messageURL, setMessageURL] = useState(null)

  useEffect(() => {
    const getMessageURL = async () => {
      setLoading(true)
      try {
        if (messageId) {
          const msgURL = await firebase.storage
            .ref()
            .child(`recordings/${messageId}`)
            .getDownloadURL()
          console.log(msgURL)

          setMessageURL(msgURL)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getMessageURL()
  }, [messageId])

  return (
    <div>
      <h1>Message Page</h1>
      <div>Message id: {messageId}</div>
      {loading && <div>Loading...</div>}
      {messageURL && <audio controls src={messageURL} />}
    </div>
  )
}

export default Message
