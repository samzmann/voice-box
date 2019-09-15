import React from 'react'
import styled from 'styled-components'
import MessageCard from '../../../components/MessageCard'

interface MessageListProps {
  messages: Array<any> // TODO: replace with correct message type, and handle empty array
}

const Container = styled.div``

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <MessageCard key={message.shortId} message={message} />
      ))}
    </Container>
  )
}

export default MessageList
