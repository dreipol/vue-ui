/**
 * Search an object by a search function
 * @param {object[]} overlays - The list of overlays
 * @param {function} fn - The search function
 * @return {boolean} The resulting flag
 */
function some(overlays, fn) {
  const values = Object.keys(overlays).map((key) => overlays[key])
  return !!values.find(fn)
}

/**
 * Check whether there are any open overlays
 * @param {object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasOpenOverlays = (state) => {
  const fn = ({ isOpen }) => isOpen
  return some(state.overlays, fn)
}

/**
 * Check whether there are any overlays that lock global scrolling
 * @param {object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasScrollLockingOverlays = (state) => {
  const fn = ({ disableScroll }) => disableScroll
  return some(state.overlays, fn)
}
