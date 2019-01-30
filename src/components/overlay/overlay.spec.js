import Overlay from './overlay.vue';
import Vuex from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import overlayModule from '../../vuex/modules/overlay';
import scrollModule from '../../modules/scroll';
import { expect } from 'chai';
import { createLocalVue, shallowMount, TransitionStub } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(Vuex);

const ExtendedTransitionStub = {
    name: 'ExtendedTransitionStub',
    extends: TransitionStub,
    mounted() {
        this.$emit('before-enter');
        this.$emit('enter');
        this.$emit('after-enter');
    },
    beforeDestroy() {
        this.$emit('before-leave');
        this.$emit('leave');
        this.$emit('after-leave');
    },
};

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
        const { vm } = shallowMount(Overlay, getDummyOverlayComponentOptions());

        expect(vm.closeOverlay).to.be.a('function');
        expect(vm.closeOverlay()).to.not.throw;
    });

    it('passes props to the rendered component and sets the facets properly', () => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions({}, {
            isOpen: true,
            facets: ['foo'],
            component: {
                props: ['bar'],
                template: '<div>{{ bar }}</div>',
            },
            props: {
                bar: 'baz',
            },
        }));

        expect(wrapper.find('.ui-overlay--component').text()).to.be.equal('baz');
        expect(wrapper.find('.ui-overlay__foo').exists()).to.be.ok;
    });

    it('the overlay will be autoclosed', done => {
        const wrapper = shallowMount(Overlay, getDummyOverlayComponentOptions({}, {
            isOpen: true,
            autoClose: {
                delay: 100,
                transition: 'foo',
            },
            component: {
                props: ['bar'],
                template: '<div>{{ bar }}</div>',
            },
            props: {
                bar: 'baz',
            },
        }));

        wrapper.vm.closeOverlay = () => done();
    });

    // TODO: Implement test to check if animation takes place (defer vs. rAF)
});
