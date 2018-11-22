import UiModelProvider from './model-provider.vue';
import UiActions from '../actions/actions.vue';
import UiRadio from '../radio/radio.vue';
import UiCheckbox from '../checkbox/checkbox.vue';
import UiInput from '../input/input.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Model Provider spec', () => {
    it('The ui-model-provide is an object', () => {
        expect(UiModelProvider).to.be.an('object');
        expect(UiModelProvider).to.be.not.empty;
    });

    it('It support toggles', () => {
        const wrapper = shallowMount(UiModelProvider, {
            propsData: {
                value: false,
            },
            scopedSlots: {
                default: `<ui-checkbox :checked="props.value" @change="props.updateValue"/>`,
            },
            stubs: {
                UiRadio,
                UiCheckbox,
                UiInput,
                UiActions,
            },
        });

        const checkbox = wrapper.find(UiCheckbox);
        const input = input.find('input').element;

        expect(wrapper.vm.value).to.be.not.ok;
        expect(input.checked).to.be.not.ok;

        checkbox.trigger('change');

        expect(wrapper.vm.value).to.be.ok;
        expect(input.checked).to.be.ok;
    });
});
