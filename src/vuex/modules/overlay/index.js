import cloneDeep from 'lodash/cloneDeep'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'
import Vue from 'vue'

import {
  CLOSE_OVERLAY,
  MOUNT_OVERLAY,
  OPEN_OVERLAY,
  PREPARE_CLOSE_OVERLAY,
  UNMOUNT_OVERLAY,
  UPDATE_OVERLAY,
} from '../mutation-types'
import * as actions from './actions'
import * as getters from './getters'

export const DEFAULT_OPENING_STATE = {
  isOpen: true,
  facets: ['base'],
  transition: null,
  disableScroll: true,
  autoClose: null,
  component: null,
  props: {},
}

export const DEFAULT_CLOSING_STATE = {
  isOpen: false,
  facets: ['base'],
  transition: null,
  disableScroll: false,
  autoClose: null,
  component: null,
  props: {},
}

/**
 * The mutations available in the module
 */
const mutations = {
  [MOUNT_OVERLAY](state, { id }) {
    Vue.set(state.overlays, id, cloneDeep(DEFAULT_CLOSING_STATE))
  },
  [UNMOUNT_OVERLAY](state, { id }) {
    Vue.delete(state.overlays, id)
  },
  [OPEN_OVERLAY](state, payload) {
    const mutation = {
      ...cloneDeep(DEFAULT_OPENING_STATE),
      ...omitBy(payload, isNil),
    }

    Vue.set(state.overlays, payload.id, mutation)
  },
  [UPDATE_OVERLAY](state, payload) {
    const overlay = state.overlays[payload.id]

    if (!overlay) {
      throw Error(`The given overlay "${payload.id}" was not found!`)
    }

    Vue.set(overlay, 'props', {
      ...state.overlays[payload.id].props,
      ...payload.props,
    })
  },
  [PREPARE_CLOSE_OVERLAY](state, payload) {
    const overlay = state.overlays[payload.id]

    if (!overlay) {
      return
    }

    const { transition, disableScroll } = {
      ...cloneDeep(DEFAULT_CLOSING_STATE),
      ...omitBy({ transition: overlay.transition }, isNil),
      ...omitBy(payload, isNil),
    }

    Vue.set(overlay, 'transition', transition)
    Vue.set(overlay, 'disableScroll', disableScroll)
  },
  [CLOSE_OVERLAY](state, payload) {
    const overlay = state.overlays[payload.id]

    if (!overlay) {
      return
    }

    const mutation = {
      ...cloneDeep(DEFAULT_CLOSING_STATE),
      ...{ facets: overlay.facets },
      ...omitBy(payload, isNil),
    }

    Vue.set(state.overlays, payload.id, mutation)
  },
}

/**
 * The state of the module
 */
const state = {
  overlays: {},
}

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
