/**
 * Convert a list of urls into a string that can be used as a value of a `srcset` attribute
 * @param {string[]} list - A list of urls
 * @return {string} The srcset attribute string
 */
export default function srcsetFilter(list) {
  if (list.length <= 1) {
    return ''
  }

  return list.map((url, i) => `${url} ${i + 1}x`).join(', ')
}
