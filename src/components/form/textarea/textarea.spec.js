import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UiTextarea from './textarea.vue'
import UiActions from '../actions/actions.vue'

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque tortor
ac ligula suscipit, ac semper ex fermentum. Aenean consequat mauris vel tincidunt porttitor.
Donec quis faucibus mi. Vestibulum condimentum id nunc feugiat elementum.`

describe('Component textarea', () => {
  it('The ui-textarea is an object', () => {
    expect(UiTextarea).to.be.an('object')
    expect(UiTextarea).to.be.not.empty
  })

  it('It can be properly created', () => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: 'foo',
      },
      stubs: {
        UiActions,
      },
    })

    expect(wrapper.find('.ui-form-field__action').exists()).to.not.ok
    expect(wrapper.find('textarea').exists()).to.be.ok
    expect(
      wrapper
        .find('.ui-form-field__input-container')
        .element.getAttribute('data-action-count'),
    ).to.be.equal('0')
    expect(wrapper.find('.ui-form-field--is-filled').exists()).to.be.ok
  })

  it('It increases the height of the textarea properly', (done) => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: '',
      },
    })
    const { vm } = wrapper
    const textarea = wrapper.find('textarea')
    const elementHeight = textarea.element.style.height

    textarea.setValue(LOREM_IPSUM)

    vm.$nextTick(() => {
      expect(vm.currentValue).to.be.equal(LOREM_IPSUM)
      expect(textarea.element.style.height).to.be.not.equal(elementHeight)
      done()
    })
  })

  it('It does not increase the height of the textarea if hasAutoHeight is set to false', (done) => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: '',
        hasAutoHeight: false,
      },
    })
    const { vm } = wrapper
    const textarea = wrapper.find('textarea')
    const elementHeight = textarea.element.style.height

    textarea.setValue(LOREM_IPSUM)

    vm.$nextTick(() => {
      expect(vm.currentValue).to.be.equal(LOREM_IPSUM)
      expect(textarea.element.style.height).to.be.equal(elementHeight)
      done()
    })
  })

  it('It decreases the height of the textarea properly', (done) => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: LOREM_IPSUM,
      },
    })

    const { vm } = wrapper
    const textarea = wrapper.find('textarea')
    const elementHeight = textarea.element.style.height

    textarea.setValue('')

    vm.$nextTick(() => {
      expect(textarea.element.style.height).to.be.not.equal(elementHeight)
      done()
    })
  })

  it('It can render the the slots properly', () => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: '',
      },
      slots: {
        label: '<p class="custom-label">Hello</p>',
        messages: '<ul class="messages"><li>message</li></ul>',
      },
    })

    expect(wrapper.find('.custom-label').exists()).to.be.ok
    expect(wrapper.find('.messages').exists()).to.be.ok
    expect(wrapper.find('.ui-form-field__action').exists()).to.be.not.ok
  })

  it('It can handle custom actions', () => {
    const wrapper = shallowMount(UiTextarea, {
      propsData: {
        value: '',
      },
      stubs: {
        UiActions,
      },
      slots: {
        actions: ['foo'],
      },
    })

    expect(wrapper.findAll('.ui-form-field__action')).to.have.length(1)
    expect(
      wrapper
        .find('.ui-form-field__input-container')
        .element.getAttribute('data-action-count'),
    ).to.be.equal('1')
  })
})
