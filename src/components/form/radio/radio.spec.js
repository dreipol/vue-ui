import UiRadio from './radio.vue';
import UiActions from '../actions/actions.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Component radio', () => {
    it('The ui-radio is an object', () => {
        expect(UiRadio).to.be.an('object');
        expect(UiRadio).to.be.not.empty;
    });

    it('It can be properly created', () => {
        const wrapper = shallowMount(UiRadio, {
            propsData: {
                value: '',
            },
            stubs: {
                UiActions,
            },
            slots: {
                label: '<p class="label">Label</p>',
            },
        });

        expect(wrapper.find('.form-field--action').exists()).to.not.ok;
        expect(wrapper.find('input').exists()).to.be.ok;
        expect(wrapper.find('.label').exists()).to.be.ok;
    });

    it('It can handle the value property properly', () => {
        const wrapper = shallowMount(UiRadio, {
            propsData: {
                value: 'foo',
            },
            stubs: {
                UiActions,
            },
        });

        const input = wrapper.find('input').element;

        expect(input.value).to.be.equal('foo');
        expect(input.checked).to.be.not.ok;
        expect(wrapper.vm.isChecked).to.be.not.ok;
    });

    it('It can handle the checked attribute', () => {
        const wrapper = shallowMount(UiRadio, {
            propsData: {
                value: 'foo',
            },
            attrs: {
                checked: true,
            },
            stubs: {
                UiActions,
            },
        });

        const input = wrapper.find('input').element;

        expect(input.value).to.be.equal('foo');
        expect(input.checked).to.be.ok;
        expect(wrapper.vm.isChecked).to.be.ok;
        expect(wrapper.find('.form-field__is-checked').exists()).to.be.ok;
    });

    it('It can dispatch the onchange events listened from the outside', done => {
        const wrapper = shallowMount(UiRadio, {
            propsData: {
                value: 'foo',
            },
            attrs: {
                checked: true,
            },
            listeners: {
                change: () => done(),
            },
            stubs: {
                UiActions,
            },
        });

        wrapper.find('input').trigger('change');
    });
});
