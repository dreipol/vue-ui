import cloneDeep from 'lodash.clonedeep';
import isNil from 'lodash.isnil';
import omitBy from 'lodash.omitby';
import Vue from 'vue';

import { CLOSE_OVERLAY, MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, UNMOUNT_OVERLAY } from '../mutation-types';
import * as actions from './actions';
import * as getters from './getters';


export const DEFAULT_OPENING_STATE = {
    isOpen: true,
    facets: ['base'],
    transition: 'trs-overlay-fade',
    disableScroll: true,
    autoClose: null,
    component: null,
    props: {},
};

export const DEFAULT_CLOSING_STATE = {
    isOpen: false,
    facets: ['base'],
    transition: 'trs-overlay-fade',
    disableScroll: false,
    autoClose: null,
    component: null,
    props: {},
};

/**
 * The mutations available in the module
 */
const mutations = {
    [MOUNT_OVERLAY](state, { id }) {
        Vue.set(state.overlays, id, cloneDeep(DEFAULT_CLOSING_STATE));
    },
    [UNMOUNT_OVERLAY](state, { id }) {
        Vue.delete(state.overlays, id);
    },
    [OPEN_OVERLAY](state, payload) {
        const mutation = {
            ...cloneDeep(DEFAULT_OPENING_STATE),
            ...omitBy(payload, isNil),
        };

        Vue.set(state.overlays, payload.id, mutation);
    },
    [PREPARE_CLOSE_OVERLAY](state, payload) {
        const overlay = state.overlays[payload.id];

        if (!overlay) {
            return;
        }

        const { transition, disableScroll } = Object.assign(
            cloneDeep(DEFAULT_CLOSING_STATE),
            omitBy(payload, isNil),
        );

        Vue.set(overlay, 'transition', transition);
        Vue.set(overlay, 'disableScroll', disableScroll);
    },
    [CLOSE_OVERLAY](state, payload) {
        const { facets } = state.overlays[payload.id];
        const mutation = {
            ...cloneDeep(DEFAULT_CLOSING_STATE),
            ...{ facets },
            ...omitBy(payload, isNil),
        };

        Vue.set(state.overlays, payload.id, mutation);
    },
};

/**
 * The state of the module
 */
export const state = {
    overlays: {},
};


export default {
    namespaced: true,
    mutations,
    actions,
    getters,
    state,
};
