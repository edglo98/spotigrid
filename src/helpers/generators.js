export function generateRandomString (length, type = 'characters') {
  let characters
  switch (type) {
    case 'num':
      characters = '0123456789'
      break
    case 'alf':
      characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      break
    default:
      characters = 'abcdefghijklmnopqrstuvwxyz' + new Date().getTime()
      break
  }
  let pass = ''
  for (let i = 0; i < length; i++) {
    pass += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return pass
}
