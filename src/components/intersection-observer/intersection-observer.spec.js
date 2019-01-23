import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import IntersectionObserverComponent from './intersection-observer.vue';

describe('Intersection-Observer', function() {
    it.skip('Component is an object', () => {
        expect(IntersectionObserverComponent).to.be.an('object');
        expect(IntersectionObserverComponent).to.be.not.empty;
    });

    it.skip('Component registers an observer', () => {
        const wrapper = shallowMount(IntersectionObserverComponent, {});

        const { observer, observerOptions } = wrapper.find(IntersectionObserverComponent).vm;

        expect(observer).to.be.an('object');
        expect(observer).to.be.not.empty;

        expect(observerOptions).to.be.an('object');
        expect(observerOptions).to.be.not.empty;
    });

    it('The intersect enter will be triggered', done => {
        const wrapper = shallowMount({
            components: {
                ioc: IntersectionObserverComponent,
            },
            data() {
                return {
                    inlineStyle: {
                        width: `${ window.innerWidth }px`,
                        height: `${ window.innerHeight * 2 }px`,
                    },
                    isVisible: true,
                };
            },
            methods: {
                onVisible() {
                    done();
                },
            },
            template: '<div><div v-if="isVisible" :style="inlineStyle">Goodbye</div><ioc @intersect-enter="onVisible">Hello</ioc></div>',
        }, {
            attachToDocument: true,
        });

        setTimeout(() => {
            wrapper.vm.isVisible = false;
        }, 1000);
    });
});
