import firebase from '../firebase'

export interface MessageDocument {
  shortId: string
  downloadURL: string
  storageFullPath?: string
  isAudioProcessing?: boolean
  // owner: string // TODO: add id of message owner
}

export const createMessage = async (message: MessageDocument) => {
  try {
    const ref = await firebase.db.collection('messages').add(message)
    return ref
  } catch (error) {
    console.log('Error creating message document:', error)
  }
}

export const getMessageByShortId = async (shortId: string) =>
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
