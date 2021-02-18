import UiActions from '../actions/actions.vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Component actions', () => {
    it('It can handle empty actions', () => {
        const wrapper = shallowMount(UiActions, {});

        expect(wrapper.findAll('.ui-form-field__actions')).to.have.length(0);
        expect(wrapper.find('.ui-form-field--has-actions').exists()).to.not.be.ok;
    });

    it('It can handle custom actions', () => {
        const wrapper = shallowMount(UiActions, {
            slots: {
                default: ['foo', '<template>bar</template>', '<p>baz</p>'],
            },
        });

        expect(wrapper.findAll('.ui-form-field__action')).to.have.length(3);
    });
});
