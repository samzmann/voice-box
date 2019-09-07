/**
 * Taken from https://github.com/invertase/react-native-firebase/blob/62715f894e559e75cf4761581938f04c16b48e74/src/utils/index.js#L357
 * */

const AUTO_ID_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const SHORT_ID_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

export const firestoreAutoId = (): string => {
  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += AUTO_ID_CHARS.charAt(
      Math.floor(Math.random() * AUTO_ID_CHARS.length)
    )
  }
  return autoId
}

export const shortId = (): string => {
  let id = ''

  const length = 5

  for (let i = 0; i < length; i++) {
    id += SHORT_ID_CHARS.charAt(
      Math.floor(Math.random() * SHORT_ID_CHARS.length)
    )
  }
  return id
}
