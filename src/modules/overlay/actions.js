import { CLOSE_OVERLAY, MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, UNMOUNT_OVERLAY, UPDATE_OVERLAY } from '../mutation-types';

/**
 * Trigger close action for an overlay
 * @param {object} context - A vuex action context
 * @param {object} payload - A vuex action payload
 * @return {Promise} promise resolved once the last overlay commit will be dispatched
 */
export function openOverlay({ commit, state }, payload) {
    return new Promise(resolve => {
        const { id } = payload;

        if (!state.overlays[id]) {
            commit(MOUNT_OVERLAY, { id });
        }

        const mutation = {
            ...payload,
            timestamp: Date.now(),
        };

        setTimeout(() => {
            commit(OPEN_OVERLAY, mutation);
            resolve();
        });
    });
}

/**
 * Trigger update action for an overlay
 * @param {object} context - A vuex action context
 * @param {object} payload - A vuex action payload
 */
export function updateOverlay({ commit }, { id, props }) {
    commit(UPDATE_OVERLAY, { id, props });
}

/**
 * Trigger close action for an overlay
 * @param {object} context - A vuex action context
 * @param {object} payload - A vuex action payload
 * @return {Promise} promise resolved once the last overlay commit will be dispatched
 */
export function closeOverlay({ commit, state }, { id, transition } = {}) {
    return new Promise(resolve => {
        const mutation = {
            id,
            transition,
        };

        if (!state.overlays[id]) {
            resolve();
            return;
        }

        commit(PREPARE_CLOSE_OVERLAY, { id, transition });

        setTimeout(() => {
            commit(CLOSE_OVERLAY, mutation);
            resolve();
        });
    });
}

export function unmountOverlay({ commit }, { id }) {
    commit(UNMOUNT_OVERLAY, { id });
}
