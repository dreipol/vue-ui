import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { Modal } from '../../../';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import overalyModule from '../../modules/overlay';

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

describe('Modal spec', () => {
    it('The modal is an object', () => {
        expect(Modal).to.be.an('object');
        expect(Modal).to.be.not.empty;
    });

    it('It can be properly created without slots', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions());

        expect(wrapper.find('.modal').exists()).to.be.ok;
    });

    it('Slots markup will not be rendered if not needed', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions());

        expect(wrapper.find('.modal--header').exists()).to.be.not.ok;
        expect(wrapper.find('.modal--body').exists()).to.be.not.ok;
        expect(wrapper.find('.modal--footer').exists()).to.be.not.ok;
    });

    it('Slots markup rendered if needed', () => {
        const wrapper = shallowMount(Modal, getDummyModalComponentOptions({
            slots: {
                default: '<div>Default</div>',
                header: '<div>Header</div>',
                footer: '<div>Footer</div>',
            },
        }));

        expect(wrapper.find('.modal--header').exists()).to.be.ok;
        expect(wrapper.find('.modal--body').exists()).to.be.ok;
        expect(wrapper.find('.modal--footer').exists()).to.be.ok;
    });
});
