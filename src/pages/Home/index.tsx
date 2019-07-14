import React from 'react'
import { RouteComponentProps } from '@reach/router';

interface HomePageProps extends RouteComponentProps {

}

const Home: React.FC<HomePageProps> = () => {
  return (
      <h1>Home Page</h1>
  )
};

export default Home
