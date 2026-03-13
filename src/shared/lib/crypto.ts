import { MD5 } from 'crypto-js'

export const md5 = (message: string, salt: string) => {
  const encryptInputValue = salt ? message + salt : message
  return MD5(encryptInputValue).toString().toUpperCase()
}
