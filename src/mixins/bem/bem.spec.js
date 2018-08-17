/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import { DEFAULT_OPTIONS } from './helpers';
import bemMixin from './';

const ROOT_CLASS = 'root';
const localVue = createLocalVue();

function getDummyComponentProps(mixin) {
    return {
        mixins: [mixin],
    };
}

describe('Bem Mixin', () => {
    describe('Computed properties', () => {
        it('It returns the bemRoot class properly', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS)));

            expect(vm.bemRoot).to.be.equal(ROOT_CLASS);
        });

        it('It returns the bem facets properly', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS)));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include(`${ ROOT_CLASS }${ DEFAULT_OPTIONS.bemModifierMarker }${ DEFAULT_OPTIONS.defaultFacet }`);
        });

        it('Custom bem mixin options have also an impact on the computed pros', () => {
            const customOptions = {
                bemModifierMarker: '$$',
                defaultFacet: 'foo',
                bemElementMarker: '??',
            };
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS, customOptions)));

            expect(vm.bemFacets).to.be.an('array');
            expect(vm.bemFacets).to.include(`${ ROOT_CLASS }${ customOptions.bemModifierMarker }${ customOptions.defaultFacet }`);
        });
    });
    describe('Methods', () => {
        it('Simple custom facets can be easily added', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS)));
            const customFacet = 'foo';

            expect(vm.bemAdd(customFacet)).to.be.equal(`${ ROOT_CLASS }${ DEFAULT_OPTIONS.bemModifierMarker }${ customFacet }`);
        });

        it('Complex custom facets can be easily added', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS)));
            const rootName = 'I';
            const elementName = 'like';
            const customFacet = 'pizzas';

            expect(vm.bemAdd(customFacet, elementName, rootName)).to.be.equal(`${ rootName }${ DEFAULT_OPTIONS.bemElementMarker }${ elementName }${ DEFAULT_OPTIONS.bemModifierMarker }${ customFacet }`);
        });

        it('Bem classes can be properly switched conditionally', () => {
            const vm = new localVue(getDummyComponentProps(bemMixin(ROOT_CLASS)));
            const trueModifier = 'jep';
            const falseModifier = 'nope';

            expect(vm.bemIf(true, trueModifier, falseModifier)).to.be.equal(`${ ROOT_CLASS }${ DEFAULT_OPTIONS.bemModifierMarker }${ trueModifier }`);
            expect(vm.bemIf(false, trueModifier, falseModifier)).to.be.equal(`${ ROOT_CLASS }${ DEFAULT_OPTIONS.bemModifierMarker }${ falseModifier }`);
        });
    });
});
