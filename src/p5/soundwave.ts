import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import { color } from '../constants/color'

const soundwave = (p: any) => {
  let canvas
  let canvasInitialized = false
  let parentDivRef: HTMLDivElement = null

  let audio: object
  let audioInitialized = false

  let mic
  let fft: p5.FFT

  p.setup = () => {
    // canvas = p.createCanvas(canvasConfig.width, canvasConfig.height)
    canvas = p.createCanvas(0, 0)
    p.background(color.DarkGrey)
    // p.frameRate(1)

    mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT()
    fft.setInput(mic)
  }

  p.draw = () => {
    p.background(color.DarkGrey)
    p.fill(color.LightGrey)
    p.noStroke()

    const barWidth = 5
    const gutterWidth = 2
    const numRects = p.floor(p.width / (barWidth + gutterWidth))
    const actualGutter = (p.width - numRects * barWidth) / (numRects + 1)

    // for (let i = 0; i < numRects; i++) {
    //   const posX = actualGutter + i * (barWidth + actualGutter)
    //   const posY = p.height
    //   const randHeight = p.random(0, p.height)
    //   const barHeight = -(posY - (posY - randHeight))
    //   p.rect(posX, posY, barWidth, barHeight)
    // }

    const spectrum = fft.analyze()
    console.log('spectrum', spectrum)

    for (let i = 0; i < numRects; i++) {
      const posX = actualGutter + i * (barWidth + actualGutter)
      // const posY = p.height
      const posY = p.map(spectrum[i], 0, 255, p.height, 0)
      const randHeight = p.random(0, p.height)
      const barHeight = -(posY - (posY - randHeight))
      p.rect(posX, posY, barWidth, posY)
    }

    // p.stroke(255, 0, 0)
    //
    // for (let i = 0; i < numRects; i++) {
    //   const posX = actualGutter + i * (barWidth + actualGutter)
    //
    //   const posY = p.rect(posX, 0, 1, spectrum[i])
    //   p.ellipse(p.width / 2, p.height / 2, 10, 10)
    // }
  }

  p.windowResized = () => {
    const { clientWidth, clientHeight } = parentDivRef
    p.resizeCanvas(clientWidth, clientHeight)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps: any) => {
    console.log('newProps', newProps)

    if (!canvasInitialized) {
      const { parentDivRef: parentDivRefProp } = newProps
      parentDivRef = parentDivRefProp.current

      if (parentDivRef) {
        const { clientWidth, clientHeight } = parentDivRef
        console.log({ clientWidth, clientHeight })
        p.resizeCanvas(clientWidth, clientHeight)
        canvasInitialized = true
      }
    }

    // if (!audioInitialized) {
    //   // audio = p.loadSound(newProps.audio.src)
    //   audio = p.loadSound(
    //     newProps.audio.src,
    //     () => console.log('loadSound: success'),
    //     (e: any) => console.log('loadSound: error', e)
    //   )
    //   console.log('audio', audio)
    // }
  }
}

export default soundwave
