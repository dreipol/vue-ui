import UiInput from './input.vue';
import UiActions from '../actions/actions.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Component input', () => {
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

        expect(wrapper.find('.ui-form-field__action').exists()).to.not.ok;
        expect(wrapper.find('input').exists()).to.be.ok;
        expect(wrapper.find('.ui-form-field__input-container').element.getAttribute('data-action-count')).to.be.equal('0');
        expect(wrapper.find('.ui-form-field--is-filled').exists()).to.be.ok;
        expect(wrapper.find('.ui-form-field--has-actions').exists()).to.be.not.ok;
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

        expect(wrapper.find('.custom-label').exists()).to.be.ok;
        expect(wrapper.find('.messages').exists()).to.be.ok;
        expect(wrapper.find('.ui-form-field__action').exists()).to.be.not.ok;
    });

    it('It can handle empty actions', () => {
        const wrapper = shallowMount(UiInput, {
            propsData: {
                value: '',
            },
            stubs: {
                UiActions,
            },
        });

        expect(wrapper.findAll('.ui-form-field__actions')).to.have.length(0);
        expect(wrapper.find('.ui-form-field--has-actions').exists()).to.not.be.ok;
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
                actions: ['foo', '<template>bar</template>', '<p>baz</p>'],
            },
        });

        expect(wrapper.find('.ui-form-field__input-container').element.getAttribute('data-action-count')).to.be.equal('3');
        expect(wrapper.find('.ui-form-field--has-actions').exists()).to.be.ok;
    });
});
