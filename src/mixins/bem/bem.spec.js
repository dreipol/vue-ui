import bemMixin from './';
import { expect } from 'chai';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

function getDummyComponentProps(mixin, customOptions = {}) {
    return {
        mixins: [mixin],
        ...customOptions,
    };
}

describe('Mixin bem', () => {
    describe('Props', () => {
        it('It behaves the same when `useProp` is false', () => {
            const mixin = bemMixin('root', { useProp: false });
            const vm = new localVue(getDummyComponentProps(mixin, {
                data() {
                    return { facets: [] };
                },
            }));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include('root__base');
        });
        it('It uses an internal data property when `useProp` is false', () => {
            const mixin = bemMixin('root', { useProp: false });
            const vm = new localVue(getDummyComponentProps(mixin, {
                data() {
                    return { facets: ['foo'] };
                },
            }));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include('root__foo');
        });
    });
    describe('Computed properties', () => {
        it('It returns the bemRoot class properly', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin('root')));

            expect(vm.bemRoot).to.be.equal('root');
        });

        it('It returns the bem facets properly', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin('root')));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include('root__base');
        });

        it('Custom bem mixin options have also an impact on the computed pros', () => {
            const customOptions = {
                bemModifierMarker: '$$',
                defaultFacet: 'foo',
                bemElementMarker: '??',
            };
            const vm = new localVue(getDummyComponentProps(bemMixin('root', customOptions)));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include(`root${ customOptions.bemModifierMarker }${ customOptions.defaultFacet }`);
        });
    });
    describe('Methods', () => {
        it('Simple custom facets can be easily added', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin('root')));
            const customFacet = 'foo';

            expect(vm.bemAdd(customFacet)).to.be.equal('root__foo');
        });

        it('Complex custom facets can be easily added', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin('root')));
            const rootName = 'I';
            const elementName = 'like';
            const customFacet = 'pizzas';

            expect(vm.bemAdd(customFacet, elementName, rootName)).to.be.equal('I--like__pizzas');
        });

        it('Bem classes can be properly switched conditionally', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin('root')));
            const trueModifier = 'jep';
            const falseModifier = 'nope';

            expect(vm.bemIf(true, trueModifier, falseModifier)).to.be.equal('root__jep');
            expect(vm.bemIf(false, trueModifier, falseModifier)).to.be.equal('root__nope');
        });
    });
});
