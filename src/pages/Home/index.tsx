import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import MessageList from './MessageList'
import { getMessages } from '../../utils/database'
import Loading from '../../components/Loading'
import styled from 'styled-components'

interface HomePageProps extends RouteComponentProps {}

const Container = styled.div`
  align-self: center;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 375px;
  }
`

const Home: React.FC<HomePageProps> = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const getMessageList = async () => {
      isMounted && setLoading(true)
      try {
        const msgs = await getMessages()
        console.log(msgs)
        isMounted && setMessages(msgs)
        isMounted && setLoading(false)
      } catch (error) {
        console.log(error)
        isMounted && setLoading(false)
        isMounted && setError('Something went wrong, please reload the page.')
      }
    }

    getMessageList()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container>
      <h1>Home Page</h1>
      {loading && <Loading />}
      {!!messages.length && !loading && <MessageList messages={messages} />}
      {error && <div>{error}</div>}
    </Container>
  )
}

export default Home
