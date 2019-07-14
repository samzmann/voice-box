import React from 'react'
import { RouteComponentProps } from '@reach/router'

interface MessagePageProps extends RouteComponentProps {
  messageId?: string
}

const Message: React.FC<MessagePageProps> = ({ messageId }) => {
  return (
    <div>
      <h1>Message Page</h1>
      <div>Message id: {messageId}</div>
    </div>
  )
}

export default Message
