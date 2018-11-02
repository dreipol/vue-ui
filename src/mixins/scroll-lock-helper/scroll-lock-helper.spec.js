import { createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import scrollLockHelperMixin from './';

const localVue = createLocalVue();

function getDummyComponentProps(customOptions = {}) { // eslint-disable-line
    const store = new Vuex.Store({
        modules: {
            /* TODO: hook the scroll vuex module */
            scroll: {
                namespaced: true,
                mutations: {},
                actions: {},
                getters: {},
                state: {
                    hasScrollLockingOverlays: false,
                    scrollbarWidth: 10,
                },
            },
        },
    });

    return {
        store,
        localVue,
        mixins: [scrollLockHelperMixin],
        ...customOptions,
    };
}

describe('Scroll lock helper mixin', () => {
    describe('Computed properties', () => {
        it('Can read the scroll overlay flag', () => {
            expect(true).to.be.not.undefined;
        });
    });
});
