import clamp from 'lodash.clonedeep';
import documentHeight from '../../util/dom/document-height';
import scrollbarWidth from '../../util/dom/scrollbar-width';
import { scrollTop } from '../../util/dom/scroll-position';
import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';

/**
 * Request scroll data to update
 */
export function setScroll({ commit }) {
    const position = scrollTop();

    commit(SET_SCROLL, {
        position,
        progress: +clamp(position / (documentHeight() - window.innerHeight), 0, 1).toFixed(2),
        scrollbarWidth: scrollbarWidth(),
    });
}

/**
 * Order the application to lock the window's scroll context
 */
export function disableScroll({ commit }, { isLocked }) {
    commit(DISABLE_SCROLL, { isLocked });
}
