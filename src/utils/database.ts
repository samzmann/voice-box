import firebase from '../firebase'

interface MessageDocument {
  shortId: string
  downloadURL: string
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
