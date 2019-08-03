import { useState, useEffect, SetStateAction } from 'react'

import firebase from './index'
import { User } from 'firebase'

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(firebase.auth.currentUser)
  const [authInitialized, setAuthInitialized] = useState(
    !!firebase.auth.currentUser
  )

  useEffect(() => {
    console.log('running effect')
    firebase.auth.onAuthStateChanged(
      (firebaseAuthUser: SetStateAction<User>) => {
        console.log('firebaseAuthUser', firebaseAuthUser)
        setAuthUser(firebaseAuthUser)
        setAuthInitialized(true)
      }
    )
  }, [])

  return { authUser, authInitialized }
}
