import { documentHeight, scrollbarWidth, scrollTop } from 'bianco.viewport';
import clamp from 'lodash.clonedeep';
import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';

/**
 * Request scroll data to update
 */
export function setScroll({ commit }) {
    const position = scrollTop();
    const average = position / (documentHeight() - window.innerHeight);

    commit(SET_SCROLL, {
        position,
        progress: +clamp(isNaN(average) ? 0 : average, 0, 1).toFixed(2),
        scrollbarWidth: scrollbarWidth(),
    });
}

/**
 * Order the application to lock the window's scroll context
 */
export function disableScroll({ commit }, { isLocked }) {
    commit(DISABLE_SCROLL, { isLocked });
}
