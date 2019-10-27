import 'p5/lib/addons/p5.sound'

const soundwave = (p: any) => {
  let canvas
  let canvasInitialized = false

  let audio
  let audioInitialized = false

  let parentDivRef: HTMLDivElement = null
  let parentDivRefInitialized = false

  p.setup = () => {
    // canvas = p.createCanvas(canvasConfig.width, canvasConfig.height)
    canvas = p.createCanvas(0, 0)
    p.background(0, 0, 0, 0)
    p.frameRate(0.1)
  }

  p.draw = () => {
    p.fill(255, 255, 255)
    p.noStroke()

    // const rectWidth = 40
    // const gutterWidth = 20
    // const availableWidth = p.width - 2 * gutterWidth
    //
    // console.log({ width: p.width, availableWidth })
    //
    // for (
    //   let i = gutterWidth;
    //   i < availableWidth - gutterWidth;
    //   i = i + rectWidth + gutterWidth
    // ) {
    //   p.rect(i, 0, rectWidth, p.height)
    // }

    const w = p.width
    const h = p.height

    const rS = 50

    const gutterW = 10

    const possibleRects = p.floor(w / (rS + gutterW))

    const numRects = 3
    const initialPosX = (w / 2 - rS / 2) / numRects

    const actualGutter = (w - numRects * rS) / (numRects + 1)

    console.log({ width: p.width, numRects, initialPosX, actualGutter })

    for (let i = 0; i < numRects; i++) {
      const posX = actualGutter + i * (rS + actualGutter)
      console.log('posX', posX)
      const posY = 0
      p.rect(posX, posY, rS, rS)
    }

    p.noFill()
    p.stroke(255, 0, 0)
    p.rect(0, 0, p.width, p.height)
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
    //   audio = p.loadSound(newProps.audio.src)
    //   console.log('audio', audio)
    // }
  }
}

export default soundwave
