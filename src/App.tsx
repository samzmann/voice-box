import React, { useState } from 'react'
import { Router } from '@reach/router'
import { AuthContext, useAuth } from './firebase/auth'
import { UserContext } from './context/userContext'

import Nav from './components/Nav'
import Home from './pages/Home'
import Record from './pages/Record'
import Message from './pages/Message'
import Signup from './pages/Signup'
import Channel from './pages/Channel'
import { ChannelDocument } from './utils/database'

const App: React.FC = () => {
  const { authUser, authInitialized } = useAuth()

  const [user, setUser] = useState<ChannelDocument>(null)

  return (
    <AuthContext.Provider value={{ authUser, authInitialized }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div>
          <Nav />
          <Router>
            <Home path="/" />
            <Signup path="/signup" />
            <Record path="/record" />
            <Channel path="/:urlSuffix" />
            <Message path="/m/:shortId" />
          </Router>
        </div>
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
