import * as types from './mutation-types';


export function openOverlay({ commit, state }, payload) {
    const { id } = payload;

    if (!state.overlays[id]) {
        commit(types.MOUNT_OVERLAY, { id });
    }

    const mutation = Object.assign(
        payload,
        { timestamp: Date.now() },
    );

    Vue.nextTick(() => {
        commit(types.OPEN_OVERLAY, mutation);
    });
}

export function closeOverlay({ commit }, { id, transition } = {}) {
    commit(types.PREPARE_CLOSE_OVERLAY, { id, transition });

    Vue.nextTick(() => {
        commit(types.CLOSE_OVERLAY, {
            id,
            transition,
            onAfterClose: () => commit(types.UNMOUNT_OVERLAY, { id }),
        });
    });
}
