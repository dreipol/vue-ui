/**
 * Search overlays by a search function
 * @param {Object[]} overlays - The list of overlays
 * @param {Function} fn - The search function
 * @return {boolean} The resulting flag
 */
function findInOverlays(overlays, fn) {
    const values = Object.keys(overlays).map(key => overlays[key]);
    return !!values.find(fn);
}

/**
 * Check whether there are any open overlays
 * @param {Object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasOpenOverlays = state => {
    const fn = ({ isOpen }) => isOpen;
    return findInOverlays(state.overlays, fn);
};

/**
 * Check whether there are any overlays that lock global scrolling
 * @param {Object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasScrollLockingOverlays = state => {
    const fn = ({ disableScroll }) => disableScroll;
    return findInOverlays(state.overlays, fn);
};
