import React from 'react'
import { Router } from '@reach/router'
import './App.css'

import Home from './pages/Home'
import Record from './pages/Record'
import Message from './pages/Message'

const App: React.FC = () => {
  return (
    <Router>
      <Home path="/" />
      <Record path="/record" />
      <Message path="/:messageId" />
    </Router>
  )
}

export default App
