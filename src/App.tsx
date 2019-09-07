import React from 'react'
import { Router } from '@reach/router'

import Nav from './components/Nav'

import Home from './pages/Home'
import Record from './pages/Record'
import Message from './pages/Message'

const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <Router>
        <Home path="/" />
        <Record path="/record" />
        <Message path="/:shortId" />
      </Router>
    </div>
  )
}

export default App
