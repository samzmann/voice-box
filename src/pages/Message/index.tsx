import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { getMessageByShortId } from '../../utils/database'
import Loading from '../../components/Loading'
import MessageCard from '../../components/MessageCard'
import { PageContainer } from '../../elements/PageContainer'

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
    <PageContainer>
      <h1>Message Page</h1>
      {loading && <Loading />}
      {message && <MessageCard message={message} />}
      {error && <div>{error}</div>}
    </PageContainer>
  )
}

export default Message
