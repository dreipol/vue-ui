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

        expect(observer).to.be.an('object');
        expect(observer).to.be.not.empty;

        expect(observerOptions).to.be.an('object');
        expect(observerOptions).to.be.not.empty;
    });

    it('interserct-enter triggers on appearance', done => {
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
                    wrapper.destroy();
                },
            },
            mounted() {
                setTimeout(() => {
                    this.isVisible = false;
                }, 200);
            },
            template: '<div><div v-if="isVisible" :style="inlineStyle">Goodbye</div><ioc @intersect-enter="onVisible">Hello</ioc></div>',
        }, {
            stubs: {
                ioc: IntersectionObserverComponent,
            },
            attachToDocument: true,
        });
    });

    it('interserct-leave triggers on disappearance', done => {
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
                    isVisible: false,
                };
            },
            methods: {
                onLeave() {
                    done();
                    wrapper.destroy();
                },
            },
            mounted() {
                setTimeout(() => {
                    this.isVisible = true;
                }, 200);
            },
            template: '<div><div v-if="isVisible" :style="inlineStyle">Goodbye</div><ioc @intersect-leave="onLeave">Hello</ioc></div>',
        }, {
            stubs: {
                ioc: IntersectionObserverComponent,
            },
            attachToDocument: true,
        });
    });
});
