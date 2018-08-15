/**
 * Check if there are active instances of overlays
 * @param {Object} state - The vuex module store
 * @return {boolean} A flag indicating if there are open overlays
 */
export const hasOpenOverlays = state => {
    const overlays = Object.keys(state.overlays).map(key => state[key]);
    return !!overlays.find(({ isOpen }) => isOpen);
};

/**
 * Check if there are instances of overlays that lock page scrolling
 * @param {Object} state - The vuex module store
 * @return {boolean} A flag indicating if there are overlays taht lock page scrolling
 */
export const hasScrollLockingOverlays = state => {
    const overlays = Object.keys(state.overlays).map(key => state[key]);
    return !!overlays.find(({ disableScroll }) => disableScroll);
};
