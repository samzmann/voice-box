import React from 'react'
import { RouteComponentProps } from '@reach/router';

interface RecordPageProps extends RouteComponentProps {

}

const Record: React.FC<RecordPageProps> = () => {
  return (
      <h1>Record Page</h1>
  )
};

export default Record
