// taken from https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
export const recordAudio = () =>
  new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      let audioChunks: Array<Blob> = []

      mediaRecorder.addEventListener(
        'dataavailable',
        // @ts-ignore
        (event: { data: Blob }) => {
          console.log('event', event)
          audioChunks.push(event.data)
        }
      )

      const start = () => {
        audioChunks = []
        mediaRecorder.start()
      }

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' })
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)

            const play = () => {
              audio.play()
            }

            resolve({ audioBlob, audioUrl, play })
          })

          mediaRecorder.stop()
        })

      resolve({ start, stop })
    } catch (error) {
      console.log('error:', error)
      reject(error)
    }
  })
