import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ScrollRevealComponent from './scroll-reveal.vue'

describe('Component scroll-reveal', () => {
  // eslint-disable-line
  let wrapper = null

  // In order to destroy the wrappers for failed unittests we persist the wrapper object and destroy it after each test
  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  // In order to destroy the wrappers for failed unittests we persist the wrapper object and destroy it after each test
  beforeEach(() => {
    if (wrapper) {
      wrapper.destroy()
    }
  })

  it('is an object', () => {
    expect(ScrollRevealComponent).to.be.a('object')
    expect(ScrollRevealComponent).to.be.not.empty
  })

  it('registers an observer', () => {
    wrapper = shallowMount(ScrollRevealComponent, {
      props: {
        elementClass: 'scroll-reveal',
      },
    })

    const { headroom } = wrapper.find(ScrollRevealComponent).vm

    expect(headroom).to.be.a('object')
    expect(headroom).to.be.not.empty
  })

  describe('Events', () => {
    // eslint-disable-line
    it('fires event onPin', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },
          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)

            setTimeout(() => {
              window.scrollTo(0, 0)
            }, 400)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @pin="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('fires event unpin', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @unpin="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('fires event onTop', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          template:
            '<scroll-reveal elementClass="scroll-reveal" @top="onEventFired"><h1/></scroll-reveal>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('fires event not-top', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @not-top="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('fires event bottom', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight * 2)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @bottom="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('fires event not-bottom', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight / 2)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @not-bottom="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })
  })

  describe('Classes', () => {
    // eslint-disable-line
    it('has class --pinned', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--pinned')).to.be.ok
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)

            setTimeout(() => {
              window.scrollTo(0, 100)
            }, 400)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @pin="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('has class --unpinned', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--unpinned')).to.be.ok
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal" @unpin="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('has class --top', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--top')).to.be.ok
              done()
              wrapper.destroy()
            },
          },

          template:
            '<scroll-reveal elementClass="scroll-reveal" @top="onEventFired"><h1/></scroll-reveal>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('has class --not-top', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--not-top')).to.be.ok
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @not-top="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('has class --bottom', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--bottom')).to.be.ok
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight * 2)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @bottom="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })

    it('has class --not-bottom', (done) => {
      wrapper = shallowMount(
        {
          components: {
            'scroll-reveal': ScrollRevealComponent,
          },

          data() {
            return {
              inlineStyle: {
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 2}px`,
              },
            }
          },

          methods: {
            onEventFired() {
              const { $el } = wrapper.find(ScrollRevealComponent).vm
              expect($el.classList.contains('scroll-reveal--not-bottom')).to.be
                .ok
              done()
              wrapper.destroy()
            },
          },

          mounted() {
            setTimeout(() => {
              window.scrollTo(0, window.innerHeight / 2)
            }, 200)
          },

          template:
            '<div><div :style="inlineStyle"></div><scroll-reveal elementClass="scroll-reveal"  @not-bottom="onEventFired"><h1/></scroll-reveal></div>',
        },
        {
          stubs: {
            'scroll-reveal': ScrollRevealComponent,
          },
          attachTo: document.body,
        },
      )
    })
  })
})
