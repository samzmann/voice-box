import React from 'react'
import styled from 'styled-components'
import MessageCard from '../MessageCard'
import { MessageDocument } from '../../utils/database'

const Container = styled.div``

interface MessageListProps {
  messages: MessageDocument[]
}

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
