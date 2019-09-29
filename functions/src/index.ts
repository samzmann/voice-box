import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpeg_static from 'ffmpeg-static'

admin.initializeApp()

/**
 *
 * Mostly copied from https://github.com/firebase/functions-samples/blob/master/ffmpeg-convert-audio/functions/index.js
 *
 * Converts an audio file to mp3.
 *
 * */
exports.encodeAudioToMP3 = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const message: any = snapshot.data() // FIXME: use a better type
    console.log('context:', context)
    console.log('message:', message)

    // Get storage object
    const object = admin
      .storage()
      .bucket()
      .file(message.storageFullPath)

    const filePath = object.name

    // TODO: get the contentType so we can check if the file is actually audio
    // const contentType = object.type
    //
    // // Exit if the file is not audio
    // if (contentType.startsWith('audio/')) {
    //   console.log('Content is not audio')
    //   return null
    // }

    // Helper to make an ffmpeg command return a promise.
    const promisifyCommand = (cmd: ffmpeg.FfmpegCommand) =>
      new Promise((resolve, reject) => {
        cmd
          .on('end', resolve)
          .on('error', reject)
          .run()
      })

    const fileName = path.basename(filePath)

    if (fileName.endsWith('_output.mp3')) {
      console.log('Audio file was already converted')
      return null
    }

    const tempFilePath = path.join(os.tmpdir(), fileName)

    // We add a '_output.mp3' suffix to target audio file name.
    // That's where we'll upload the converted audio.
    const targetTempFileName = fileName.replace(/\.[^/.]+$/, '') + '_output.mp3'
    const targetTempFilePath = path.join(os.tmpdir(), targetTempFileName)
    const targetStorageFilePath = path.join(
      path.dirname(filePath),
      targetTempFileName
    )

    await object.download({ destination: tempFilePath })

    console.log('Audio downloaded to', tempFilePath)

    const command = ffmpeg(tempFilePath)
      .setFfmpegPath(ffmpeg_static.path)
      .format('mp3')
      .output(targetTempFilePath)

    await promisifyCommand(command)

    const uploadedMP3 = await admin
      .storage()
      .bucket()
      .upload(targetTempFilePath, {
        destination: targetStorageFilePath,
      })

    console.log('uploadedMP3', uploadedMP3)

    // Delete the local files once audio has been uploaded
    fs.unlinkSync(tempFilePath)
    fs.unlinkSync(targetTempFilePath)

    return true
  })
