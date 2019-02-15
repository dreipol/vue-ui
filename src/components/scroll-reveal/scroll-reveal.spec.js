import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ScrollRevealComponent from './scroll-reveal.vue';

describe('Component scroll-reveal', () => { // eslint-disable-line
    let wrapper = null;

    // In order to destroy the wrappers for failed unittests we persist the wrapper object and destroy it after each test
    afterEach(() => {
        if (wrapper) {
            wrapper.destroy();
        }
    });

    // In order to destroy the wrappers for failed unittests we persist the wrapper object and destroy it after each test
    beforeEach(() => {
        if (wrapper) {
            wrapper.destroy();
        }
    });

    it('is an object', () => {
        expect(ScrollRevealComponent).to.be.a('object');
        expect(ScrollRevealComponent).to.be.not.empty;
    });

    it('registers an observer', () => {
        wrapper = shallowMount(ScrollRevealComponent, {
            props: {
                elementClass: 'scroll-reveal',
            },
        });

        const { headroom } = wrapper.find(ScrollRevealComponent).vm;

        expect(headroom).to.be.a('object');
        expect(headroom).to.be.not.empty;
    });

    describe('Events', () => { // eslint-disable-line
        it('fires event onPin', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, window.innerHeight);
                        }, 200);

                        setTimeout(() => {
                            window.scrollTo(0, 0);
                        }, 400);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @onPin="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('fires event onUnpin', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, 500);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onUnpin="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('fires event onTop', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },


                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    template: '<scroll-reveal elementClass="scroll-reveal" @onTop="onEventFired"><h1/></scroll-reveal>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('fires event onNotTop', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, 500);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onNotTop="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('fires event onBottom', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, window.innerHeight * 2);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onBottom="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });


        it('fires event onNotBottom', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, window.innerHeight / 2);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onNotBottom="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });
    });

    describe('Classes', () => { // eslint-disable-line
        it('has class __pinned', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__pinned')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, 1500);
                        }, 200);

                        setTimeout(() => {
                            window.scrollTo(0, 100);
                        }, 400);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @onPin="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('has class __unpinned', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__unpinned')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, 500);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @onUnpin="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('has class __top', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },


                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__top')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    template: '<scroll-reveal elementClass="scroll-reveal" @onTop="onEventFired"><h1/></scroll-reveal>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('has class __not-top', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__not-top')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, 500);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onNotTop="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });

        it('has class __bottom', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__bottom')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, window.innerHeight * 2);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onBottom="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });


        it('has class __not-bottom', (done) => {
            wrapper = shallowMount(
                {
                    components: {
                        'scroll-reveal': ScrollRevealComponent,
                    },

                    data() {
                        return {
                            inlineStyle: {
                                width: `${ window.innerWidth }px`,
                                height: `${ window.innerHeight * 2 }px`,
                            },
                        };
                    },

                    methods: {
                        onEventFired() {
                            const { $el } = wrapper.find(ScrollRevealComponent).vm;
                            expect($el.classList.contains('scroll-reveal__not-bottom')).to.be.ok;
                            done();
                            wrapper.destroy();
                        },
                    },

                    mounted() {
                        setTimeout(() => {
                            window.scrollTo(0, window.innerHeight / 2);
                        }, 200);
                    },

                    template: '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @onNotBottom="onEventFired"><h1/></scroll-reveal></div>',
                },
                {
                    stubs: {
                        'scroll-reveal': ScrollRevealComponent,
                    },
                    attachToDocument: true,
                }
            );
        });
    });
});
