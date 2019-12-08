import React from 'react'
import { Router } from '@reach/router'
import { AuthContext, useAuth } from './firebase/auth'

import Nav from './components/Nav'
import Home from './pages/Home'
import Record from './pages/Record'
import Message from './pages/Message'
import Signup from './pages/Signup'
import Channel from './pages/Channel'

const App: React.FC = () => {
  const { authUser, authInitialized } = useAuth()

  return (
    <AuthContext.Provider value={{ authUser, authInitialized }}>
      <div>
        <Nav />
        <Router>
          <Home path="/" />
          <Signup path="/signup" />
          <Record path="/record" />
          <Message path="/:shortId" />
          {/*<Channel path="/:urlSuffix" />*/}
        </Router>
      </div>
    </AuthContext.Provider>
  )
}

export default App
