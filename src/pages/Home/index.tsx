import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import MessageList from './MessageList'
import { getMessages } from '../../utils/database'
import Loading from '../../components/Loading'

interface HomePageProps extends RouteComponentProps {}

const Home: React.FC<HomePageProps> = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getMessageList = async () => {
      setLoading(true)
      try {
        const msgs = await getMessages()
        console.log(msgs)
        setMessages(msgs)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError('Something went wrong, please reload the page.')
      }
    }

    getMessageList()

    // TODO: add cleanup, cancel getMessages if unmounted
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      {loading && <Loading />}
      {!!messages.length && !loading && <MessageList messages={messages} />}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Home
