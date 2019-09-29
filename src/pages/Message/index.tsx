import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { getMessageByShortId } from '../../utils/database'
import Loading from '../../components/Loading'

interface MessagePageProps extends RouteComponentProps {
  shortId?: string
}

const Message: React.FC<MessagePageProps> = ({ shortId }) => {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
        setError('Something went wrong, please reload the page.')
      }
    }

    getMessageURL()
  }, [shortId])

  return (
    <div>
      <h1>Message Page</h1>
      <div>Message id: {shortId}</div>
      {loading && <Loading />}
      {message && <audio controls src={message.downloadURL} />}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Message
