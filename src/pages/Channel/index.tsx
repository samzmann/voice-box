import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { getChannelByUrlSuffix, getLastMessages } from '../../utils/database'
import Loading from '../../components/Loading'
import { PageContainer } from '../../elements/PageContainer'
import MessageList from '../../components/MessageList'

interface ChannelPageProps extends RouteComponentProps {
  urlSuffix?: string
}

const Channel: React.FC<ChannelPageProps> = ({ urlSuffix }) => {
  const [channel, setChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const getChannel = async () => {
      setLoading(true)
      try {
        if (urlSuffix) {
          const chnl = await getChannelByUrlSuffix(urlSuffix)
          console.log('channel', chnl)
          isMounted && setChannel(chnl)
          isMounted && setLoading(false)
        }
      } catch (error) {
        console.log(error)
        isMounted && setLoading(false)
        isMounted && setError('Something went wrong, please reload the page.')
      }
    }

    getChannel()

    return () => {
      isMounted = false
    }
  }, [urlSuffix])

  useEffect(() => {
    let isMounted = true

    const getMessages = async () => {
      try {
        if (channel) {
          const msgs = await getLastMessages(channel.ownerId)
          console.log('msgs', msgs)
          isMounted && setMessages(msgs)
        }
      } catch (error) {
        console.log(error)
        isMounted && setError(error.message)
      }
    }

    getMessages()

    return () => {
      isMounted = false
    }
  }, [channel])

  return (
    <PageContainer>
      {loading && <Loading />}
      {channel && <h1>{channel.name}</h1>}
      {error && <div>{error}</div>}
      {messages && <MessageList messages={messages} />}
    </PageContainer>
  )
}

export default Channel
