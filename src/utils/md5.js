import crypto from 'crypto'
const cryptPwd = password => {
  var md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

export const getRandomSalt = () => {
  return Math.random()
    .toString()
    .slice(2, 8)
}


export default cryptPwd
