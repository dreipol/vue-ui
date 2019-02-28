import Modal from './modal.vue';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import overalyModule from '../../vuex/modules/overlay/index';
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

function getDummyModalComponentOptions(customOptions = {}) {
    const store = new Vuex.Store({
        modules: {
            overlay: cloneDeep(overalyModule),
        },
    });

    return {
        store,
        localVue,
        ...customOptions,
    };
}

describe('Component modal', () => {
    it('is an object', () => {
        expect(Modal).to.be.an('object');
        expect(Modal).to.be.not.empty;
    });

    it('can be properly created without slots', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions());

        expect(wrapper.find('.ui-modal').exists()).to.be.ok;
    });

    it('does not render slots when not needed', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions());

        expect(wrapper.find('.ui-modal--header').exists()).to.be.not.ok;
        expect(wrapper.find('.ui-modal--body').exists()).to.be.not.ok;
        expect(wrapper.find('.ui-modal--footer').exists()).to.be.not.ok;
    });

    it('does render slot markup when necessary', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions({
            slots: {
                body: '<div>body</div>',
                header: '<div>header</div>',
                footer: '<div>footer</div>',
            },
        }));

        expect(wrapper.find('.ui-modal--header').exists()).to.be.ok;
        expect(wrapper.find('.ui-modal--body').exists()).to.be.ok;
        expect(wrapper.find('.ui-modal--footer').exists()).to.be.ok;
    });
});
