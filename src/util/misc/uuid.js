/* eslint-disable no-bitwise */

/**
 * UUID generator according to IETF
 * @link https://www.ietf.org/rfc/rfc4122.txt
 * @link https://stackoverflow.com/a/2117523/1602864
 * @return {string} A RFC4122 compliant uuid string
 */
export default function uuidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
