import React, { useState, useEffect } from 'react'

const Loading = () => {
  const [dots, setDots] = useState('')
  useEffect(() => {
    const newDots = dots.length < 3 ? dots + '.' : ''
    const timeout = setTimeout(() => {
      setDots(newDots)
    }, 250)
    return () => clearTimeout(timeout)
  }, [dots])
  return <div>Loading{dots}</div>
}

export default Loading
