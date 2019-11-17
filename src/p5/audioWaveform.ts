import 'p5/lib/addons/p5.sound'
import { color } from '../constants/color'

const audioWaveform = (p: any) => {
  let canvasInitialized = false
  let parentDivRef: HTMLDivElement = null

  let waveformData: number[] = []
  let normalizedData: number[] = []
  let maxAmplitude = 0

  p.setup = () => {
    p.createCanvas(0, 0)
    p.background(color.DarkGrey)
  }

  p.draw = () => {
    p.background(color.DarkGrey)
    p.fill(color.LightGrey)
    p.noStroke()

    const barWidth = 5
    const gutterWidth = 2
    const numRects = p.floor(p.width / (barWidth + gutterWidth))
    const actualGutter = (p.width - numRects * barWidth) / (numRects + 1)

    // normalise waveformData to the actual amount of rects.
    // eg. If waveformData has 10 value and numRects = 3, this routine
    // will produce an array with three values representing the average
    if (normalizedData.length !== numRects) {
      normalizedData = []
      maxAmplitude = 0

      // generate a temporary array of length = numRects,
      // each value is an array of values in waveformArray
      // with the corresponding targetIndex
      const temp = waveformData.reduce((acc, val, index) => {
        const targetIndex = Math.floor((index / waveformData.length) * numRects)
        const targetArray = acc[targetIndex] || []
        targetArray.push(val)
        acc[targetIndex] = targetArray
        return acc
      }, [])

      // generate the average of each value array in temp array
      for (let i = 0; i < temp.length; i++) {
        const averagedAmplitude =
          temp[i].reduce((a: number, b: number) => a + b, 0) / temp[i].length
        normalizedData[i] = averagedAmplitude
        if (averagedAmplitude > maxAmplitude) {
          maxAmplitude = averagedAmplitude
        }
      }
    }

    // render the bars
    for (let i = 0; i < normalizedData.length; i++) {
      const posX = actualGutter + i * (barWidth + actualGutter)
      const posY = p.height
      const randHeight = p.map(normalizedData[i], 0, maxAmplitude, 0, p.height)
      const barHeight = -(posY - (posY - randHeight))
      p.rect(posX, posY, barWidth, barHeight)
    }
  }

  p.windowResized = () => {
    const { clientWidth, clientHeight } = parentDivRef
    p.resizeCanvas(clientWidth, clientHeight)
  }

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps: any) => {
    console.log('newProps', newProps)

    // set the canvas size to parent div's size
    if (!canvasInitialized) {
      const { parentDivRef: parentDivRefProp } = newProps
      parentDivRef = parentDivRefProp.current

      if (parentDivRef) {
        const { clientWidth, clientHeight } = parentDivRef
        p.resizeCanvas(clientWidth, clientHeight)
        canvasInitialized = true
      }
    }

    const { waveformData: waveformDataFromProps } = newProps
    if (waveformDataFromProps) {
      waveformData = waveformDataFromProps
    }
  }
}

export default audioWaveform
