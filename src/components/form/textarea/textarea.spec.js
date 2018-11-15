import Textarea from './Textarea.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';


describe('Overlay spec', () => {
    it('The textarea is an object', () => {
        expect(Textarea).to.be.an('object');
        expect(Textarea).to.be.not.empty;
    });

    it('It can be properly created', () => {
        const wrapper = shallowMount(Textarea, {
            value: '',
        });

        expect(wrapper.find('.form-field--input').exists()).to.be.ok;
    });
});
