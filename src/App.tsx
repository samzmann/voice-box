import React, { useState } from 'react'
import { Router } from '@reach/router'
import { AuthContext, useAuth } from './firebase/auth'
import { UserContext } from './context/userContext'
import { ChannelDocument } from './utils/database'

import Nav from './components/Nav'
import Home from './pages/Home'
import Record from './pages/Record'
import Message from './pages/Message'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Channel from './pages/Channel'

const App: React.FC = () => {
  const [user, setUser] = useState<ChannelDocument>(null)

  const { authUser, authInitialized } = useAuth(setUser)

  return (
    <AuthContext.Provider value={{ authUser, authInitialized }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div>
          <Nav />
          <Router>
            <Home path="/" />
            <Login path="/login" />
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
