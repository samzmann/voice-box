import firebase from '../firebase'

export interface MessageDocument {
  shortId: string
  downloadURL: string
  storageFullPath?: string
  isAudioProcessing?: boolean
  duration: number
  waveform?: number[]
  // owner: string // TODO: add id of message owner
}

export type ChannelDocument = {
  name: string
  urlSuffix: string
}

export const createMessage = async (message: MessageDocument) => {
  try {
    const ref = await firebase.db.collection('messages').add(message)
    return ref
  } catch (error) {
    console.log('Error creating message document:', error)
  }
}

export const getMessageByShortId = (shortId: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase.db
        .collection('messages')
        .where('shortId', '==', shortId)
        .get()

      if (querySnapshot.docs.length) {
        return resolve(querySnapshot.docs[0].data())
      }

      throw new Error('No message found for this id.')
    } catch (error) {
      console.log('Error fetching message document:', error)
      reject(error)
    }
  })

export const getMessages = () =>
  new Promise<any[]>(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase.db.collection('messages').get()

      if (querySnapshot.docs.length) {
        return resolve(querySnapshot.docs.map(message => message.data()))
      }

      throw new Error('No messages found.')
    } catch (error) {
      console.log('Error fetching messages:', error)
      reject(error)
    }
  })

export const createChannel = async (channel: ChannelDocument) => {
  try {
    const ref = await firebase.db.collection('channels').add(channel)
    return ref
  } catch (error) {
    console.log('Error creating channel document:', error)
  }
}

export const checkAvailabilityAndCreateChannel = (channel: ChannelDocument) =>
  new Promise(async (resolve, reject) => {
    try {
      // TODO: fail fast?
      //  Also: getChannelByUrlSuffix should loop until a valid url is found, cause the user has no say on what the url is (this should be done in the signup form)
      const results = await Promise.all([
        getChannelByName(channel.name),
        getChannelByUrlSuffix(channel.urlSuffix),
      ])
      console.log('results', results)

      const nameTaken = results[0] !== null
      const urlTaken = results[0] !== null

      console.log({ nameTaken, urlTaken })

      if (nameTaken || urlTaken) {
        return reject({ nameTaken, urlTaken })
      }

      const channelRef = await createChannel(channel)

      resolve(channelRef)
    } catch (error) {
      console.log('checkAvailabilityAndCreateChannel error', error)
      reject(error)
    }
  })

export const getChannelByName = (name: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase.db
        .collection('channels')
        .where('name', '==', name)
        .get()

      if (querySnapshot.docs.length) {
        return resolve(querySnapshot.docs[0].data())
      }

      return resolve(null)
    } catch (error) {
      console.log('Error getting channel by name:', error)
      reject(error)
    }
  })

export const getChannelByUrlSuffix = (urlSuffix: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await firebase.db
        .collection('channels')
        .where('urlSuffix', '==', urlSuffix)
        .get()

      if (querySnapshot.docs.length) {
        return resolve(querySnapshot.docs[0].data())
      }

      return resolve(null)
    } catch (error) {
      console.log('Error getting channel by urlSuffix:', error)
      reject(error)
    }
  })
