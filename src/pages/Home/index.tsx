import React from 'react'
import { RouteComponentProps } from '@reach/router'
import LargeRecordButton from './LargeRecordButton'

interface HomePageProps extends RouteComponentProps {}

const Home: React.FC<HomePageProps> = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <LargeRecordButton />
    </div>
  )
}

export default Home
