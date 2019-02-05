/* eslint-disable max-lines-per-function */

import UiCheckbox from './checkbox.vue';
import UiActions from '../actions/actions.vue';
import UiIcon from '../../icon/icon.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Radio spec', () => {
    it('The ui-checkbox is an object', () => {
        expect(UiCheckbox).to.be.an('object');
        expect(UiCheckbox).to.be.not.empty;
    });

    it('It can be properly created', () => {
        const wrapper = shallowMount(UiCheckbox, {
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
        });

        expect(wrapper.find('.form-field--action').exists()).to.not.ok;
        expect(wrapper.find('input').exists()).to.be.ok;
        expect(wrapper.find('.label').exists()).to.be.ok;
    });

    it('It can handle the value property properly', () => {
        const wrapper = shallowMount(UiCheckbox, {
            propsData: {
                value: 'foo',
            },
            stubs: {
                UiIcon,
                UiActions,
            },
        });

        const input = wrapper.find('input').element;

        expect(input.value).to.be.equal('foo');
        expect(input.checked).to.be.not.ok;
        expect(wrapper.vm.isChecked).to.be.not.ok;
    });

    it('It can handle the checked attribute', () => {
        const wrapper = shallowMount(UiCheckbox, {
            propsData: {
                value: 'foo',
            },
            attrs: {
                checked: true,
            },
            stubs: {
                UiIcon,
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
        const wrapper = shallowMount(UiCheckbox, {
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
                UiIcon,
                UiActions,
            },
        });

        wrapper.find('input').trigger('change');
    });

    it('It can be used as toggle', done => {
        const wrapper = shallowMount(UiCheckbox, {
            propsData: {
                value: false,
            },
            listeners: {
                change: () => done(),
            },
            stubs: {
                UiIcon,
                UiActions,
            },
        });

        const input = wrapper.find('input');

        expect(input.element.value).to.be.equal('false');
        expect(input.element.checked).to.be.not.ok;
        expect(wrapper.vm.isChecked).to.be.not.ok;

        input.setChecked(true);

        expect(input.element.value).to.be.equal('true');
        expect(input.element.checked).to.be.ok;
        expect(wrapper.vm.isChecked).to.be.ok;
    });
});
