import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import { color } from '../constants/color'

const audioSpectrum = (p: any) => {
  let canvasInitialized = false
  let parentDivRef: HTMLDivElement = null

  let mic
  let fft: p5.FFT

  let isMicOn = false

  p.setup = () => {
    p.createCanvas(0, 0)
    p.background(color.DarkGrey)

    mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT(0.95, 512)
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

    const spectrum = fft.analyze(512)

    // TODO: complete this:
    // Only keep frequencies between 85 and 255 Hz, which is
    // the frequency range of the human voice
    // -> https://en.wikipedia.org/wiki/Voice_frequency
    // We map from 20 to 15k Hz, which is apparently the range
    // that p5.Sound works with
    // -> https://github.com/processing/p5.js-sound/issues/307
    const lowCut = p.floor(p.map(85, 20, 15000, 0, 1024))
    const highCut = p.floor(p.map(255, 20, 15000, 0, 1024))

    for (let i = 0; i < numRects; i++) {
      const posX = actualGutter + i * (barWidth + actualGutter)
      const posY = p.height
      const barHeight = p.map(
        spectrum[i + lowCut], // start at lowCut (but the loop still starts at 0 to make positioning easier)
        0,
        200, // go to 200 instead of 255 because there aren't many high values
        0.01 * p.height,
        p.height
      )
      p.rect(posX, posY, barWidth, -barHeight)
    }
  }

  p.windowResized = () => {
    const { clientWidth, clientHeight } = parentDivRef
    p.resizeCanvas(clientWidth, clientHeight)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps: any) => {
    console.log('newProps', newProps)

    // set the canvas size to parent div's size
    // if (!canvasInitialized) {
    const { parentDivRef: parentDivRefProp } = newProps
    parentDivRef = parentDivRefProp.current

    if (parentDivRef) {
      const { clientWidth, clientHeight } = parentDivRef
      p.resizeCanvas(clientWidth, clientHeight)
      canvasInitialized = true
      console.log('canvasInitialized', canvasInitialized)
    }
    // }

    const { userHasInteracted } = newProps
    if (!isMicOn && userHasInteracted) {
      if (p.getAudioContext().state !== 'running') {
        p.getAudioContext().resume()
        isMicOn = true
      }
    }
  }
}

export default audioSpectrum
