import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import IntersectionObserverComponent from './intersection-observer.vue';

describe('Intersection-Observer', function() {
    it('Component is an object', () => {
        expect(IntersectionObserverComponent).to.be.an('object');
        expect(IntersectionObserverComponent).to.be.not.empty;
    });

    it('Component registers an observer', () => {
        const wrapper = shallowMount(IntersectionObserverComponent, {});

        const { observer, observerOptions } = wrapper.find(IntersectionObserverComponent).vm;
        console.log(observer);

        expect(observer).to.be.an('object');
        expect(observer).to.be.not.empty;

        expect(observerOptions).to.be.an('object');
        expect(observerOptions).to.be.not.empty;
    });


});
