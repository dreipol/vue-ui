import Vue from 'vue';
import * as types from './mutation-types';

/**
 * Trigger close action for an overlay
 * @param {Object} context - A vuex action context
 * @param {Object} payload - A vuex action payload
 */
export function openOverlay({ commit, state }, payload) {
    const { id } = payload;

    if (!state.overlays[id]) {
        commit(types.MOUNT_OVERLAY, { id });
    }

    const mutation = {
        ...payload,
        timestamp: Date.now(),
    };

    Vue.nextTick(() => {
        commit(types.OPEN_OVERLAY, mutation);
    });
}

/**
 * Trigger close action for an overlay
 * @param {Object} context - A vuex action context
 * @param {Object} payload - A vuex action payload
 */
export function closeOverlay({ commit, state }, { id, transition } = {}) {
    const mutation = {
        id,
        transition,
        onAfterClose() {
            commit(types.UNMOUNT_OVERLAY, { id });
        },
    };

    if (!state.overlays[id]) {
        return;
    }

    commit(types.PREPARE_CLOSE_OVERLAY, { id, transition });

    Vue.nextTick(() => {
        commit(types.CLOSE_OVERLAY, mutation);
    });
}
