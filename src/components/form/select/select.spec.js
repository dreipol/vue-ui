import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UiSelect from './select.vue'
import UiActions from '../actions/actions.vue'
import UiIcon from '../../icon/icon.vue'
import UiOption from '../option/option.vue'
import UiOptgroup from '../optgroup/optgroup.vue'

describe('Component select', () => {
  it('The ui-select is an object', () => {
    expect(UiSelect).to.be.an('object')
    expect(UiSelect).to.be.not.empty
  })

  it('It can be properly created', () => {
    const wrapper = shallowMount(UiSelect, {
      propsData: {
        value: '',
      },
      stubs: {
        UiIcon,
        UiActions,
      },
      slots: {
        label: '<p class="label">Label</p>',
      },
    })

    expect(wrapper.find('.ui-form-field__action').exists()).to.ok
    expect(wrapper.find('select').exists()).to.be.ok
    expect(wrapper.find('.label').exists()).to.be.ok
    expect(
      wrapper
        .find('.ui-form-field__input-container')
        .element.getAttribute('data-action-count'),
    ).to.be.equal('1')
  })

  it('It can render all the options provided', () => {
    const wrapper = shallowMount(UiSelect, {
      propsData: {
        value: 'bar',
      },
      slots: {
        default: [
          '<ui-option value="foo">Foo</ui-option>',
          '<ui-option value="bar">Bar</ui-option>',
        ],
      },
      stubs: {
        UiIcon,
        UiActions,
        UiOption,
      },
    })

    const select = wrapper.find('select').element

    expect(select.value).to.be.equal('bar')
    expect(select.selectedIndex).to.be.equal(1)
    expect(wrapper.findAll('option')).to.have.length(2)
  })

  it('It can render optgroup with options', () => {
    const wrapper = shallowMount(UiSelect, {
      propsData: {
        value: 'bar3',
      },
      slots: {
        default: `
                    <ui-optgroup label="Parent">
                        <ui-option value="foo">Foo</ui-option>
                        <ui-option value="bar">Bar</ui-option>
                    </ui-optgroup>
                    <ui-optgroup label="Parent2">
                        <ui-option value="foo2">Foo</ui-option>
                        <ui-option value="bar3">Bar</ui-option>
                    </ui-optgroup>
                `,
      },
      stubs: {
        UiIcon,
        UiActions,
        UiOption,
        UiOptgroup,
      },
    })

    const select = wrapper.find('select').element
    expect(wrapper.findAll('optgroup')).to.have.length(2)
    expect(select.value).to.be.equal('bar3')
    expect(select.selectedIndex).to.be.equal(3)
  })

  it('It supports placeholders', () => {
    const wrapper = shallowMount(UiSelect, {
      propsData: {
        value: '',
      },
      attrs: {
        placeholder: 'nope',
      },
      slots: {
        default: `
                    <ui-option value="foo">Foo</ui-option>
                    <ui-option value="bar">Bar</ui-option>
                `,
      },
      stubs: {
        UiIcon,
        UiActions,
        UiOption,
        UiOptgroup,
      },
    })

    const select = wrapper.find('select').element
    expect(wrapper.findAll('option')).to.have.length(3)
    expect(select.value).to.be.equal('')
    expect(select.selectedIndex).to.be.equal(0)
  })
})
