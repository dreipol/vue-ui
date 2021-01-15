import { expect } from 'chai';
import Swiper from './swiper.vue';
import { mount } from '@vue/test-utils';

describe('Component swiper', () => {
    it('is an object', () => {
        expect(Swiper).to.be.an('object');
        expect(Swiper).to.be.not.empty;
    });

    it('passes attrs props and slot to swiper config', () => {
        const wrapper = mount(Swiper, {
            propsData: {
                pagination: {
                    clickable: false,
                },
            },
            slots: {
                default: '<p>Hello 1</p><p>Hello 2</p>',
            },
        });
        expect(wrapper.find('.swiper-pagination-bullet')).to.be.ok;
        expect(wrapper.findAll('.swiper--slide')).to.have.length(2);
        expect(wrapper.vm.$attrs.pagination.clickable).to.be.equal(false);
    });


    it('adds pictures to slide', () => {
        const wrapper = mount(Swiper, {
            slots: {
                default: '<img src="placeholder.png" alt="Image"/><img src="placeholder.png" alt="Image"/>',
            },
        });
        expect(wrapper.findAll('.swiper--slide')).to.have.length(2);
    });
});
