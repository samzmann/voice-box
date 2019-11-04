import p5 from 'p5'
import 'p5/lib/addons/p5.sound'
import { color } from '../constants/color'

const soundwave = (p: any) => {
  let canvas
  let canvasInitialized = false
  let parentDivRef: HTMLDivElement = null

  let mic
  let fft: p5.FFT

  p.setup = () => {
    canvas = p.createCanvas(0, 0)
    p.background(color.DarkGrey)

    mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT(0.95)
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

    fft.analyze()

    // averages out the values of the 1024 bins returned by fft.analyze()
    const averagedSpectrum = fft.linAverages(numRects)

    for (let i = 0; i < numRects; i++) {
      const posX = actualGutter + i * (barWidth + actualGutter)
      const posY = p.height
      const barHeight = p.map(
        averagedSpectrum[i],
        0,
        255,
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
  }
}

export default soundwave
