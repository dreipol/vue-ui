import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ScrollRevealComponent from './scroll-reveal.vue';

describe('Component scroll-reveal', () => {
    it.skip('Component is an object', () => {
        expect(ScrollRevealComponent).to.be.a('object');
        expect(ScrollRevealComponent).to.be.not.empty;
    });

    it('Component registers an observer', () => {
        const wrapper = shallowMount(ScrollRevealComponent, {});

        const { headroom } = wrapper.find(ScrollRevealComponent).vm;

        expect(headroom).to.be.a('object');
        expect(headroom).to.be.not.empty;
    });
});
