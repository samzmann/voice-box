import * as functions from 'firebase-functions'

exports.encodeAudioToMP3 = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snapshot, context) => {
    const message = snapshot.data()
    console.log('context:', context)
    console.log('message:', message)
    return true
  })
