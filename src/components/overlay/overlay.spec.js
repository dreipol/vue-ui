import Overlay from './overlay.vue';
import Vuex from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import overlayModule from '../../vuex/modules/overlay';
import scrollModule from '../../vuex/modules/scroll';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import ExtendedTransitionStub from '../../../test/helpers/extended-transition-stub';

const localVue = createLocalVue();
localVue.use(Vuex);

function getDummyOverlayComponentOptions(customOptions = {}, vuexInstanceOptions = {}) {
    const overlay = cloneDeep(overlayModule);
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
                    scroll: scrollModule,
                },
            },
        },
    });

    return {
        store,
        localVue,
        stubs: {
            transition: ExtendedTransitionStub,
        },
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
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(wrapper.vm.closeOverlay).to.be.a('function');
        expect(wrapper.vm.closeOverlay()).to.not.throw;
    });

    it('passes props to the rendered component and sets the facets properly', () => {
        const wrapper = mount(Overlay, getDummyOverlayComponentOptions({}, {
            id: 'foo',
            isOpen: true,
            facets: ['foo-facet'],
            component: {
                props: ['bar'],
                template: '<div>{{ bar }}</div>',
            },
            props: {
                bar: 'baz',
            },
        }));

        expect(wrapper.find('.ui-overlay__component').text()).to.be.equal('baz');
        expect(wrapper.find('.ui-overlay--foo-facet').exists()).to.be.ok;
    });

    it('can be autoclosed', done => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions({}, {
            id: 'foo',
            isOpen: true,
            autoClose: {
                transition: 'qux',
            },
            component: {
                props: ['bar'],
                template: '<div>{{ bar }}</div>',
            },
            props: {
                bar: 'baz',
            },
        }));

        stub(wrapper.vm, 'closeOverlay');

        wrapper.vm.closeOverlay.callsFake((...args) => {
            wrapper.vm.closeOverlay.wrappedMethod.call(wrapper.vm, ...args);
            const spyCall = wrapper.vm.closeOverlay.getCall(0);

            expect(spyCall.args[0]).to.deep.equal({ id: 'foo', transition: 'qux' });
            expect(wrapper.vm.closeOverlay).to.be.called;

            setTimeout(() => {
                expect(wrapper.find('.ui-overlay__root').exists()).to.not.be.ok;
                done();
            }, 0);
        });
    });
});
