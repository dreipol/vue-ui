import { expect } from 'chai'
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import mockData from './mock-data'
import UiTabs from './tabs.vue'

const css = `
.ui-tabs__list {
    display: flex;
}
.ui-tabs__list-item {
    color: rgba(0, 0, 0, 0.5)
}
.ui-tabs__list-item__active {
    color: rgba(0, 0, 0, 1)
}
.ui-tabs__pannel-wrapper {
    position: relative;
    transition: height 1s;
}
.ui-tabs__panel-enter, .ui-tabs__panel-leave-to {
    opacity: 0;
}
.ui-tabs__panel-enter-active, .ui-tabs__panel-leave-active {
    transition: all 1s;
    position: absolute;
}
`

const mountWrapper = (props = {}) =>
  mount(UiTabs, {
    propsData: { ...props },
    scopedSlots: {
      tab: '<div slot-scope="props">{{ props.title }}</div>',
      content() {
        return [
          mockData.map((data, index) => {
            return (
              <div title={data.tab.title} key={index}>
                <h1>{data.content.title}</h1>
                <p>{data.content.description}</p>
              </div>
            )
          }),
        ]
      },
    },
  })

describe('Component Tabs', () => {
  const styleNode = document.createElement('style')

  before(() => {
    styleNode.innerHTML = css
    document.head.appendChild(styleNode)
  })

  after(() => {
    document.head.removeChild(styleNode)
  })

  it('is an object', () => {
    expect(UiTabs).to.be.an('object')
    expect(UiTabs).to.be.not.empty
  })
  it('renders Tabs', () => {
    const wrapper = mountWrapper()

    expect(wrapper.find('.ui-tabs__list-item').element).to.exist
  })
  it('renders only one panel if isLazy is set to true', () => {
    const wrapper = mountWrapper()

    expect(
      wrapper.findAll('.ui-tabs__panel-wrapper').wrappers.length,
    ).to.be.equal(1)
  })
  it('renders all panels to dome if isLazy is set to false', () => {
    const wrapper = mountWrapper({ isLazy: false })

    expect(
      wrapper.find('.ui-tabs__panel-wrapper').element.childNodes.length,
    ).to.be.equal(4)
  })
  it('sets initial active tab', () => {
    const wrapper = mountWrapper({ initialActiveId: 2 })

    const tabs = wrapper.findAll('.ui-tabs__list-item').wrappers

    const activeIndex = tabs.findIndex((tab) =>
      tab.element.classList.contains('ui-tabs__list-item--is-active'),
    )

    expect(activeIndex).to.be.equal(2)
  })
  it('sets active tab on tab click', async () => {
    const wrapper = mountWrapper()

    const clickTab = wrapper.findAll('.ui-tabs__list-item').wrappers[3].element

    clickTab.click()

    await Vue.nextTick()

    expect(clickTab.classList.contains('ui-tabs__list-item--is-active')).to.be
      .true
  })
})
