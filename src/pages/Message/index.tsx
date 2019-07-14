import React from 'react'
import { RouteComponentProps } from '@reach/router';

interface MessagePageProps extends RouteComponentProps {

}

const Message: React.FC<MessagePageProps> = () => {
  return (
      <h1>Message Page</h1>
  )
};

export default Message
