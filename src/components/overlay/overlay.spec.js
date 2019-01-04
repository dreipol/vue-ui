import Overlay from './overlay.vue';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import overalyModule from '../../modules/overlay';
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';


const localVue = createLocalVue();

localVue.use(Vuex);

function getDummyOverlayComponentOptions(customOptions = {}, vuexInstanceOptions = {}) {
    const overlay = cloneDeep(overalyModule);
    overlay.state = {
        overlays: {
            foo: vuexInstanceOptions,
        },
    };

    const store = new Vuex.Store({
        modules: {
            'vue-ui': {
                namespaced: 'true',
                modules: {
                    overlay,
                },
            },
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

describe('Component overlay', () => {
    it('is an object', () => {
        expect(Overlay).to.be.an('object');
        expect(Overlay).to.be.not.empty;
    });

    it('can be properly created without slots', () => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(wrapper.find('.ui-overlay').exists()).to.be.ok;
    });

    it('has a close method', () => {
        const { vm } = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(vm.closeOverlay).to.be.a('function');
        expect(vm.closeOverlay()).to.not.throw;
    });

    it('passes props to the rendered component', () => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions({}, {
            isOpen: true,
            facets: ['overlay-facet'],
            component: {
                props: ['bar'],
                template: '<div>{{ bar }}</div>',
            },
            props: {
                bar: 'baz',
            },
        }));

        expect(wrapper.find('.ui-overlay--component').text()).to.be.equal('baz');
    });
});
