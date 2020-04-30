import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

import firebase from './index'
import { User } from 'firebase'
import { ChannelDocument, getChannelBy } from '../utils/database'

type AuthContextType = {
  authUser: User | null
  authInitialized: boolean
}

export const AuthContext = React.createContext<AuthContextType>({
  authUser: null,
  authInitialized: false,
})

/**
 * useAuth
 *
 * ⚠️ Should only be mounted once on top level component (App.tsx).
 *
 * Listens to auth state changes, and returns auth user.
 * If no auth user is returned by onAuthStateChanged, we create a
 * new anonymous user and return that
 *
 * @returns { AuthContextType }
 * */
export const useAuth = (
  setUser: Dispatch<SetStateAction<ChannelDocument>>
): AuthContextType => {
  const [authUser, setAuthUser] = useState(firebase.auth.currentUser)
  const [authInitialized, setAuthInitialized] = useState(
    !!firebase.auth.currentUser
  )

  useEffect(() => {
    let isMounted = true

    const authListener = firebase.auth.onAuthStateChanged(
      async (firebaseAuthUser: User) => {
        console.log('firebaseAuthUser', firebaseAuthUser)
        isMounted && setAuthUser(firebaseAuthUser)
        isMounted && setAuthInitialized(true)

        if (firebaseAuthUser && !firebaseAuthUser.isAnonymous) {
          const channel = await getChannelBy('ownerId', firebaseAuthUser.uid)
          setUser(channel)
        }

        if (!firebaseAuthUser) {
          firebase.auth.signInAnonymously().catch(console.error)
        }
      }
    )

    return () => {
      isMounted = false

      // call authListener to unsubscribe
      authListener()
    }
  }, [])

  return { authUser, authInitialized }
}
