import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';
import * as actions from './actions';

const mutations = {
    [SET_SCROLL](state, { position, progress, scrollbarWidth }) {
        state.position = position;
        state.progress = progress;
        state.scrollbarWidth = scrollbarWidth;
    },
    [DISABLE_SCROLL](state, { isLocked }) {
        state.isLocked = isLocked;
    },
};

const state = {
    position: 0,
    progress: 0,
    scrollbarWidth: null,
    isLocked: false,
};

export default {
    namespaced: true,
    mutations,
    actions,
    state,
};
