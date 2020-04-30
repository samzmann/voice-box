import React, { Dispatch, SetStateAction } from 'react'
import { ChannelDocument } from '../utils/database'

export type UserContextType = {
  user: ChannelDocument | null
  setUser: Dispatch<SetStateAction<ChannelDocument>> | null
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: null,
})
