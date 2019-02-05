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

    it('The ui-model-provider is an object', () => {
        expect(UiModelProvider).to.be.an('object');
        expect(UiModelProvider).to.be.not.empty;
    });

    it('It supports toggles', () => {
        const wrapper = shallowMount(Vue.extend({
            components: runtimeComponents,
            data() {
                return {
                    value: false,
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
                    <ui-checkbox :value="value" @change="updateValue"/>
                </ui-model-provider>
            `,
        }), {
            /**
             * Vue.js treats selects and input[type=checkbox] as "magic input fields"
             * doing nasty internal checkboxes should have the sync internal option hacks to update a model bound to them
             * vue-test-utils of course in that case has problems synching the internal v-model properties so the sync:false seems to be a practical solution to a common issue.
             * this workaround was recommended in the thread https://github.com/vuejs/vue-test-utils/issues/532
             * side issues https://github.com/vuejs/vue-test-utils/issues/676
             */
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

    it('It supports radios', (done) => {
        const wrapper = shallowMount(Vue.extend({
            components: runtimeComponents,
            data() {
                return {
                    value: 'foo',
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
                    <div>
                         <ui-radio :checked="value === 'foo'" value='foo' @change="updateValue"/>
                         <ui-radio :checked="value === 'bar'" value='bar' @change="updateValue"/>
                    </div>
                </ui-model-provider>
            `,
        }), {
            stubs: runtimeComponents,
            attachToDocument: true,
        });

        const inputs = wrapper.findAll('input');
        const input1 = inputs.at(0);
        const input2 = inputs.at(1);

        expect(wrapper.vm.value).to.be.equal('foo');
        expect(input1.element.checked).to.be.ok;

        input2.setChecked(true);

        wrapper.vm.$nextTick().then(() => {
            expect(wrapper.vm.value).to.be.equal('bar');
            expect(input1.element.checked).to.be.not.ok;
            expect(input2.element.checked).to.be.ok;
            done();
        });
    });

    it('It supports input fields', () => {
        const wrapper = shallowMount(Vue.extend({
            components: runtimeComponents,
            data() {
                return {
                    value: '',
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
                    <ui-input :value="value" @input="updateValue"/>
                </ui-model-provider>
            `,
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
            components: runtimeComponents,
            data() {
                return {
                    value: '',
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
                    <ui-textarea :value="value" @input="updateValue"/>
                </ui-model-provider>
            `,
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
            components: runtimeComponents,
            data() {
                return {
                    value: [],
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ hasItem, updateValue }">
                    <div>
                        <ui-checkbox :checked="hasItem('foo')" value='foo' @change="updateValue"/>
                        <ui-checkbox :checked="hasItem('bar')" value='bar' @change="updateValue"/>
                        <ui-checkbox :checked="hasItem('baz')" value='baz' @change="updateValue"/>
                    </div>
                </ui-model-provider>
            `,
        }), {
            /**
             * Vue.js treats selects and input[type=checkbox] as "magic input fields"
             * doing nasty internal checkboxes should have the sync internal option hacks to update a model bound to them
             * vue-test-utils of course in that case has problems synching the internal v-model properties so the sync:false seems to be a practical solution to a common issue.
             * this workaround was recommended in the thread https://github.com/vuejs/vue-test-utils/issues/532
             * side issues https://github.com/vuejs/vue-test-utils/issues/676
             */
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

    it('It supports select fields', () => {
        const wrapper = shallowMount(Vue.extend({
            components: runtimeComponents,
            data() {
                return {
                    value: 'bar',
                };
            },
            template: `
                <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
                    <ui-select :value="value" @change="updateValue">
                        <ui-option value="foo">Foo</ui-option>
                        <ui-option value="bar">bar</ui-option>
                    </ui-select>
                </ui-model-provider>
            `,
        }), {
            /**
             * Vue.js treats selects and input[type=checkbox] as "magic input fields"
             * doing internal nasty hacks to update a model bound to them
             * vueof course in that case has -utils has some problems synching the internal  so the sync:false seems to be a practical solution to a common issue.v-model properties
             * this workaround was recommended in the thread https://github.com/vuejs/vue-test-utils/issues/532
             * side issues https://github.com/vuejs/vue-test-utils/issues/676
             */
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
