/**
 * Check whether there are any open overlays
 * @param {Object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasOpenOverlays = state => {
    return Object.values(state.overlays).some(({ isOpen }) => isOpen);
};

/**
 * Check whether there are any overlays that lock global scrolling
 * @param {Object} state - The vuex state object
 * @return {boolean} The resulting flag
 */
export const hasScrollLockingOverlays = state => {
    return Object.values(state.overlays).some(({ disableScroll }) => disableScroll);
};
