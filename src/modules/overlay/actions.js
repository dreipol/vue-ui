import Vue from 'vue';
import { CLOSE_OVERLAY, MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, UNMOUNT_OVERLAY } from '../mutation-types';

/**
 * Trigger close action for an overlay
 * @param {Object} context - A vuex action context
 * @param {Object} payload - A vuex action payload
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

        Vue.nextTick(() => {
            commit(OPEN_OVERLAY, mutation);

            resolve();
        });
    });
}

/**
 * Trigger close action for an overlay
 * @param {Object} context - A vuex action context
 * @param {Object} payload - A vuex action payload
 * @return {Promise} promise resolved once the last overlay commit will be dispatched
 */
export function closeOverlay({ commit, state }, { id, transition } = {}) {
    return new Promise(resolve => {
        const mutation = {
            id,
            transition,
            onAfterClose() {
                commit(UNMOUNT_OVERLAY, { id });
            },
        };

        if (!state.overlays[id]) {
            resolve();
            return;
        }

        commit(PREPARE_CLOSE_OVERLAY, { id, transition });

        Vue.nextTick(() => {
            commit(CLOSE_OVERLAY, mutation);

            resolve();
        });
    });
}
