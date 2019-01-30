import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';

/**
 * Request scroll data to update
 */
export function setScroll({ commit }) {
    commit(SET_SCROLL);
}

/**
 * Order the application to lock the window's scroll context
 */
export function disableScroll({ commit }, { isLocked }) {
    commit(DISABLE_SCROLL, { isLocked });
}

