/* eslint-disable max-lines-per-function */

import UiModelProvider from './model-provider.vue';
import UiActions from '../actions/actions.vue';
import UiRadio from '../radio/radio.vue';
import UiSelect from '../select/select.vue';
import UiOption from '../option/option.vue';
import UiCheckbox from '../checkbox/checkbox.vue';
import UiInput from '../input/input.vue';
import UiTextarea from '../textarea/textarea.vue';
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const Vue = createLocalVue();

describe('Model Provider spec', () => {
    const runtimeComponents = {
        UiCheckbox,
        UiInput,
        UiRadio,
        UiSelect,
        UiOption,
        UiActions,
        UiModelProvider,
        UiTextarea,
    };

    it('The ui-model-provide is an object', () => {
        expect(UiModelProvider).to.be.an('object');
        expect(UiModelProvider).to.be.not.empty;
    });

    it('It supports toggles', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: false,
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <ui-checkbox slot-scope="props" :value="props.value" @change="props.updateValue"/>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            // checkboxes should have the sync option disabled
            sync: false,
            stubs: runtimeComponents,
        });

        const input = wrapper.find('input');

        expect(wrapper.vm.value).to.be.not.ok;
        expect(input.element.checked).to.be.not.ok;

        input.setChecked(true);

        expect(wrapper.vm.value).to.be.ok;
        expect(input.element.checked).to.be.ok;
    });

    it('It supports radios', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: 'foo',
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <div slot-scope="props">
                         <ui-radio :checked="props.value === 'foo'" value='foo' @change="props.updateValue"/>
                         <ui-radio :checked="props.value === 'bar'" value='bar' @change="props.updateValue"/>
                    </div>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            stubs: runtimeComponents,
        });

        const inputs = wrapper.findAll('input');
        const input1 = inputs.at(0);
        const input2 = inputs.at(1);

        expect(wrapper.vm.value).to.be.equal('foo');
        expect(input1.element.checked).to.be.ok;

        input2.setChecked(true);

        expect(wrapper.vm.value).to.be.equal('bar');
        expect(input1.element.checked).to.be.not.ok;
        expect(input2.element.checked).to.be.ok;
    });

    it('It supports input fields', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: '',
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <ui-input slot-scope="props" :value="props.value" @input="props.updateValue"/>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            stubs: runtimeComponents,
        });

        const input = wrapper.find('input');

        expect(wrapper.vm.value).to.be.not.ok;
        expect(input.element.value).to.be.not.ok;

        input.setValue('foo');

        expect(wrapper.vm.value).to.be.ok;
        expect(input.element.value).to.be.ok;
    });

    it('It supports textarea fields', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: '',
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <ui-textarea slot-scope="props" :value="props.value" @input="props.updateValue"/>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            stubs: runtimeComponents,
        });

        const textarea = wrapper.find('textarea');

        expect(wrapper.vm.value).to.be.not.ok;
        expect(textarea.element.value).to.be.not.ok;

        textarea.setValue('foo');

        expect(wrapper.vm.value).to.be.ok;
        expect(textarea.element.value).to.be.ok;
    });

    it('It supports multiple checkboxes', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: [],
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <div slot-scope="props">   
                        <ui-checkbox :checked="props.hasItem('foo')" value='foo' @change="props.updateValue"/>
                        <ui-checkbox :checked="props.hasItem('bar')" value='bar' @change="props.updateValue"/>
                        <ui-checkbox :checked="props.hasItem('baz')" value='baz' @change="props.updateValue"/>
                    </div>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            // checkboxes should have the sync option disabled
            sync: false,
            stubs: runtimeComponents,
        });

        const inputs = wrapper.findAll('input');

        const input1 = inputs.at(0);
        const input2 = inputs.at(1);
        const input3 = inputs.at(2);

        expect(wrapper.vm.value).to.be.deep.equal([]);
        expect(input1.element.checked).to.be.not.ok;
        expect(input2.element.checked).to.be.not.ok;
        expect(input3.element.checked).to.be.not.ok;

        input1.setChecked(true);

        expect(wrapper.vm.value).to.be.deep.equal([input1.element.value]);
        expect(input1.element.checked).to.be.ok;

        input2.setChecked(true);

        expect(wrapper.vm.value).to.be.deep.equal([input1.element.value, input2.element.value]);
        expect(input2.element.checked).to.be.ok;

        input1.setChecked(false);

        expect(wrapper.vm.value).to.be.deep.equal([input2.element.value]);
        expect(input1.element.checked).to.be.not.ok;
    });

    it('It supports selects fields', () => {
        const wrapper = shallowMount(Vue.extend({
            data() {
                return {
                    value: 'bar',
                };
            },
            template: `
                <ui-model-provider v-model="value">
                    <ui-select slot-scope="props" :value="props.value" @change="props.updateValue">
                        <ui-option value="foo">Foo</ui-option>
                        <ui-option value="bar">bar</ui-option>
                    </ui-select>
                </ui-model-provider>
            `,
            components: runtimeComponents,
        }), {
            sync: false,
            stubs: runtimeComponents,
        });

        const select = wrapper.find('select');

        expect(wrapper.vm.value).to.be.equal('bar');
        expect(select.element.value).to.be.equal('bar');
        expect(select.element.selectedIndex).to.be.equal(1);

        select.setValue('foo');

        expect(wrapper.vm.value).to.be.equal('foo');
        expect(select.element.value).to.be.equal('foo');
        expect(select.element.selectedIndex).to.be.equal(0);
    });
});
