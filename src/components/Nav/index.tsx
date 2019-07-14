import React from 'react'
import { Link } from '@reach/router'

const Nav = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/record">Record</Link>
      </div>
    </div>
  )
}

export default Nav
