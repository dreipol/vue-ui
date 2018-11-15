import { documentHeight, scrollbarWidth, scrollTop } from 'bianco.viewport';
import clamp from 'lodash.clamp';
import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';
import * as actions from './actions';

const mutations = {
    [SET_SCROLL](state) {
        state.position = scrollTop();
        state.progress = +clamp(state.position / (documentHeight() - window.innerHeight), 0, 1).toFixed(2);
        state.scrollbarWidth = scrollbarWidth();
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
