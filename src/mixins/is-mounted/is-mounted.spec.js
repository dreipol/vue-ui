import isMounted from './';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('Mixin is-mounted', () => {
    it('The isMounted flag becomes true after the component mounting', done => {
        shallowMount({
            mixins: [isMounted],
            template: '<p>hello</p>',
            beforeMount() {
                expect(this.isMounted).to.be.not.ok;
            },
            mounted() {
                expect(this.isMounted).to.be.ok;
                done();
            },
        }, {});
    });
});
