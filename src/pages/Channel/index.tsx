import React, { useState, useEffect, useContext } from 'react'
import { navigate, RouteComponentProps } from '@reach/router'
import { getChannelByUrlSuffix, getLastMessages } from '../../utils/database'
import Loading from '../../components/Loading'
import { PageContainer } from '../../elements/PageContainer'
import MessageList from '../../components/MessageList'
import { ButtonStandard } from '../../elements/buttons'
import firebase from '../../firebase'
import styled from 'styled-components'
import { AuthContext } from '../../firebase/auth'
import { UserContext } from '../../context/userContext'

const SignOutContainer = styled.div`
  align-self: flex-end;
`

interface ChannelPageProps extends RouteComponentProps {
  urlSuffix?: string
}

const Channel: React.FC<ChannelPageProps> = ({ urlSuffix }) => {
  const [channel, setChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { setUser } = useContext(UserContext)

  useEffect(() => {
    let isMounted = true

    const getChannel = async () => {
      setLoading(true)
      try {
        if (urlSuffix) {
          const chnl = await getChannelByUrlSuffix(urlSuffix)
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
          isMounted && setError(null)
          isMounted && setMessages(msgs)
        }
      } catch (error) {
        console.log(error)
        isMounted && setMessages([])
        isMounted && setError(error.message)
      }
    }

    getMessages()

    return () => {
      isMounted = false
    }
  }, [channel])

  const handleSignOut = async () => {
    await firebase.auth.signOut()
    setUser(null)
    navigate('/')
  }

  const { authUser } = useContext(AuthContext)

  return (
    <PageContainer>
      {loading && <Loading />}
      {channel && <h1>{channel.name}</h1>}
      {error && <div>{error}</div>}
      {messages && <MessageList messages={messages} />}
      {authUser && channel && authUser.uid === channel.ownerId && (
        <SignOutContainer>
          <ButtonStandard label={'Sign out'} onClick={handleSignOut} />
        </SignOutContainer>
      )}
    </PageContainer>
  )
}

export default Channel
