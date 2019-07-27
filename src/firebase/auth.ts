import { useState, useContext, createContext, useEffect } from 'react'
import { FirebaseContext } from './context'

export const AuthContext = createContext(null)

export const useAuth = () => {
  const firebase = useContext(FirebaseContext)
  console.log('firebase', firebase)
  const [authUser, setAuthUser] = useState(firebase.auth.currentUser)
  const [authInitialized, setAuthInitialized] = useState(
    !!firebase.auth.currentUser
  )

  console.log('authUser', authUser)
  console.log('authInitialized', authInitialized)

  useEffect(() => {
    firebase.auth.onAuthStateChanged((firebaseAuthUser: Object) => {
      console.log('firebaseAuthUser', firebaseAuthUser)
      setAuthUser(firebaseAuthUser)
      setAuthInitialized(true)
    })
  }, [])

  return { authUser, authInitialized }
}
