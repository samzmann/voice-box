import firebase from '../firebase'

export interface MessageDocument {
  shortId: string
  downloadURL: string
  storageFullPath?: string
  isAudioProcessing?: boolean
  duration: number
  waveform?: number[]
  ownerId: string
}

export type ChannelDocument = {
  name: string
  urlSuffix: string
  ownerId: string
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
      const nameTaken = await getChannelByName(channel.name)

      if (nameTaken) {
        return reject({ nameTaken })
      }

      let urlTaken = true
      let urlToTry = channel.urlSuffix
      let urlIterator: number = 0

      // TODO: keep a list of restricted urls suffixes (e.g record, signup, etc...)

      // check if url is taken, we want to make sure the url is available.
      // loop until an available one is found.
      while (urlTaken) {
        const result = await getChannelByUrlSuffix(urlToTry)
        urlTaken = !!result
        if (!urlTaken) {
          break
        }
        urlIterator++
        urlToTry = `${urlToTry}-${urlIterator}`
      }

      const channelRef = await createChannel({
        name: channel.name,
        urlSuffix: urlToTry,
        ownerId: channel.ownerId,
      })

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
