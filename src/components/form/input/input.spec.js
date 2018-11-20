import UiInput from './input.vue';
import UiActions from '../actions/actions.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Input spec', () => {
    it('The ui-input is an object', () => {
        expect(UiInput).to.be.an('object');
        expect(UiInput).to.be.not.empty;
    });

    it('It can be properly created', () => {
        const wrapper = shallowMount(UiInput, {
            propsData: {
                value: 'foo',
            },
            stubs: {
                UiActions,
            },
        });

        expect(wrapper.find('.form-field--action').exists()).to.not.ok;
        expect(wrapper.find('input').exists()).to.be.ok;
        expect(wrapper.find('.form-field--input-container').element.getAttribute('data-action-count')).to.be.equal('0');
        expect(wrapper.find('.form-field__is-filled').exists()).to.be.ok;
    });

    it('It can render the the slots properly', () => {
        const wrapper = shallowMount(UiInput, {
            propsData: {
                value: '',
            },
            slots: {
                label: '<p class="custom-label">Hello</p>',
                messages: '<ul class="messages"><li>message</li></ul>',
            },
        });

        expect(wrapper.contains('.custom-label')).to.be.ok;
        expect(wrapper.contains('.messages')).to.be.ok;
        expect(wrapper.contains('.form-field--action')).to.be.not.ok;
    });

    it('It can handle custom actions', () => {
        const wrapper = shallowMount(UiInput, {
            propsData: {
                value: '',
            },
            stubs: {
                UiActions,
            },
            slots: {
                actions: ['<p>hello</p>', '<p>there</p>'],
            },
        });

        expect(wrapper.findAll('.form-field--action')).to.to.have.length(2);
        expect(wrapper.find('.form-field--input-container').element.getAttribute('data-action-count')).to.be.equal('2');
    });
});
