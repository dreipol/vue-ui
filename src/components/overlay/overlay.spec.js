/* eslint-disable no-unused-expressions, max-nested-callbacks */

import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { Overlay } from '../../../';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import overalyModule from '../../modules/overlay';

const localVue = createLocalVue();

localVue.use(Vuex);


describe('Overlay spec', () => {
    function getDummyOverlayComponentOptions(customOptions = {}) {
        const store = new Vuex.Store({
            modules: {
                overlay: cloneDeep(overalyModule),
            },
        });

        return {
            store,
            localVue,
            propsData: {
                id: 'foo',
            },
            ...customOptions,
        };
    }

    it('The overlay is an object', () => {
        expect(Overlay).to.be.an('object');
        expect(Overlay).to.be.not.empty;
    });

    it('It can be properly created without slots', () => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(wrapper.find('.overlay').exists()).to.be.ok;
    });

    it('It has the close method', () => {
        const { vm } = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(vm.closeOverlay).to.be.a('function');
        expect(vm.closeOverlay()).to.not.throw;
    });
});
