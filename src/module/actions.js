import * as types from './mutation-types';

/**
 * Handle steps to open an overlay
 * @access private
 * @param {Object} context - A vuex action context object
 * @param {Object} payload - A vuex action payload object
 */
export function openOverlay({ commit, state }, payload) {
    const { overlays } = state;
    const { id } = payload;

    if (!overlays[id]) {
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
 * Handle steps to close an overlay
 * @access private
 * @param {Object} context - A vuex action context object
 * @param {Object} payload - A vuex action payload object
 */
export function closeOverlay({ commit, state }, payload) {
    const { overlays } = state;
    const { id, transition } = payload;

    if (!overlays[id]) {
        return;
    }

    commit(types.PREPARE_CLOSE_OVERLAY, { id, transition });

    Vue.nextTick(() => {
        const mutation = {
            id,
            transition,
            onAfterClose() {
                commit(types.UNMOUNT_OVERLAY, { id });
            },
        };

        commit(types.CLOSE_OVERLAY, mutation);
    });
}
