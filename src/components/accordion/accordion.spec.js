/* eslint-disable max-lines-per-function */

import UiAccordion from './accordion.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';


describe('Accordion spec', () => {
    const css = `.ui-accordion .ui-accordion--head {
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.ui-accordion .ui-accordion--body {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: opacity 300ms ease;
}

.ui-accordion.ui-accordion__is-open .ui-accordion--body {
  opacity: 1;
}

.ui-accordion.ui-accordion__is-animating .ui-accordion--body {
  transition: opacity 300ms ease, max-height 300ms ease;
}
`;
    const styleNode = document.createElement('style');

    before(() => {
        styleNode.innerHTML = css;
        document.head.appendChild(styleNode);
    });

    after(() => {
        document.head.removeChild(styleNode);
    });

    it('The ui-accordion is an object', () => {
        expect(UiAccordion).to.be.an('object');
        expect(UiAccordion).to.be.not.empty;
    });

    it('It can be properly opened when the isPassive mode is disabled', () => {
        const wrapper = shallowMount(UiAccordion, {
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p>Body</p>',
            },
        });

        const button = wrapper.find('button');
        button.trigger('click');

        expect(wrapper.vm.state.isOpen).to.be.ok;
    });

    it('It can be properly opened when the isPassive mode is enabled', () => {
        const wrapper = shallowMount(UiAccordion, {
            propsData: {
                isPassive: true,
                isOpen: false,
            },
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p>Body</p>',
            },
        });


        wrapper.setProps({ isOpen: true });
        console.log(wrapper.vm.state.isOpen);
        expect(wrapper.vm.state.isOpen).to.be.ok;
    });

    it('Dom Events do not change the component state in the passive mode', () => {
        const wrapper = shallowMount(UiAccordion, {
            propsData: {
                isPassive: true,
                isOpen: false,
            },
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p>Body</p>',
            },
        });

        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.state.isOpen).to.be.not.ok;
    });

    it('The component change event will be dispatched', (done) => {
        const wrapper = shallowMount(UiAccordion, {
            propsData: {
                isPassive: true,
                isOpen: false,
            },
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p>Body</p>',
            },
            listeners: {
                change() {
                    expect(wrapper.vm.state.isOpen).to.be.ok;
                    done();
                },
            },
        });

        wrapper.vm.$nextTick(() => {
            wrapper.setProps({ isOpen: true });
        });
    });

    it('The component changed event will be properly dispatched', (done) => {
        const wrapper = shallowMount(UiAccordion, {
            propsData: {
                isPassive: true,
                isOpen: false,
            },
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p>Body</p>',
            },
            listeners: {
                changed(isOpen) {
                    if (isOpen) {
                        expect(wrapper.vm.state.isOpen).to.be.equal(true);
                        wrapper.setProps({ isOpen: false });
                    } else {
                        expect(wrapper.vm.state.isOpen).to.be.equal(false);
                        // wait the closing animation to consider this test done
                        done();
                    }
                },
            },
            attachToDocument: true,
        });

        wrapper.vm.$nextTick(() => {
            wrapper.setProps({ isOpen: true });
        });
    });

    it('The body slot will receive the isVisible property', (done) => {
        const wrapper = shallowMount(UiAccordion, {
            propsData: {
                isPassive: true,
                isOpen: false,
            },
            scopedSlots: {
                head: '<h1 class="label">Head</h1>',
                body: '<p slot-scope="props">{{ props.isVisible }}</p>',
            },
            listeners: {
                change() {
                    // it will be true only when the transition will be complete
                    expect(wrapper.find('p').html()).to.be.equal('<p>false</p>');
                },
                changed() {
                    expect(wrapper.find('p').html()).to.be.equal('<p>true</p>');
                    done();
                },
            },
            attachToDocument: true,
        });

        wrapper.vm.$nextTick(() => {
            wrapper.setProps({ isOpen: true });
        });
    });
});
