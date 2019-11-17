import getBlobDuration from 'get-blob-duration'

// taken from https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
export const recordAudio = () =>
  new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      let audioChunks: Array<Blob> = []

      let contentType = '' // will hold the MIME type

      mediaRecorder.addEventListener(
        'dataavailable',
        // @ts-ignore
        (event: { data: Blob }) => {
          console.log('event', event)
          contentType = event.data.type
          audioChunks.push(event.data)
        }
      )

      const start = () => {
        audioChunks = []
        mediaRecorder.start()
      }

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener('stop', async () => {
            const audioBlob = new Blob(audioChunks, { type: contentType })
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)
            const duration = await getBlobDuration(audioBlob)

            const play = () => {
              audio.play()
            }

            resolve({ audioBlob, audioUrl, duration, play })
          })

          mediaRecorder.stop()
        })

      resolve({ start, stop })
    } catch (error) {
      console.log('error:', error)
      reject(error)
    }
  })

// partly taken from https://medium.com/jeremy-gottfrieds-tech-blog/javascript-tutorial-record-audio-and-encode-it-to-mp3-2eedcd466e78
export const encodeAudioToMp3 = (audioUrl: URL) => {
  console.log('encodeAudioToMp3 input:', audioUrl)
  // try {
  //   const process = new ffmpeg(audioUrl)
  //   console.log('process', process)
  //   process.then((audio: any) => {
  //     console.log(audio)
  //   })
  // } catch (error) {
  //   console.log('error in encodeAudioToMp3', error)
  // }
}

/**
 * MP3 encoding with ffmpeg not working.
 * Check:
 *  - https://github.com/electron/electron/issues/7300
 *  - https://medium.com/google-developers/make-audio-recordings-with-actions-on-google-3094158c2a2d
 *  - https://github.com/googlearchive/dialogflow-audio-recorder-nodejs/blob/master/public/javascript/audiodemo.js
 * */
