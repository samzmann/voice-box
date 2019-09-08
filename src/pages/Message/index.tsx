import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { getMessageByShortId } from '../../utils/database'

interface MessagePageProps extends RouteComponentProps {
  shortId?: string
}

const Message: React.FC<MessagePageProps> = ({ shortId }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const getMessageURL = async () => {
      setLoading(true)
      try {
        if (shortId) {
          const msg = await getMessageByShortId(shortId)
          console.log('message', msg)
          setMessage(msg)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getMessageURL()
  }, [shortId])

  return (
    <div>
      <h1>Message Page</h1>
      <div>Message id: {shortId}</div>
      {loading && <div>Loading...</div>}
      {message && <audio controls src={message.downloadURL} />}
    </div>
  )
}

export default Message
