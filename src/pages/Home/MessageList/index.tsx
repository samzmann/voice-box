import React from 'react'
import styled from 'styled-components'
import MessageCard from '../../../components/MessageCard'
import { MessageDocument } from '../../../utils/database'

interface MessageListProps {
  messages: MessageDocument[]
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
