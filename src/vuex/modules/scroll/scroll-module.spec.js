/* eslint-disable max-lines-per-function */
import { DISABLE_SCROLL, SET_SCROLL } from '../mutation-types';
import * as actions from './actions';
import scrollModule from './';

import { expect } from 'chai';
import { spy } from 'sinon';

/**
 * Depending on the headless chrome used, the scrollbar might have different sizes
 * @return {number} The scrollbar width
 */
function getScrollbarWidth() {
    let result;
    const scrollDiv = document.createElement('div');
    scrollDiv.style = 'width:100px;height:100px;overflow:scroll;position:absolute';

    document.body.appendChild(scrollDiv);
    result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return result;
}

describe('Vuex scroll module', () => {
    describe('Scroll default export', () => {
        it('The scroll module exports properly all the vuex properties', () => {
            const props = ['namespaced', 'mutations', 'actions', 'state'];

            props.forEach(prop => {
                expect(scrollModule).to.have.property(prop);
            });
        });
    });

    describe('Actions', () => {
        describe('setScroll', () => {
            it('', function() {
                const commit = spy();

                actions.setScroll({ commit });

                const [setScrollEventArgs] = commit.args;

                expect(setScrollEventArgs).to.be.deep.equal([SET_SCROLL]);
            });
        });

        describe('disableScroll', () => {
            it('', function() {
                const commit = spy();
                const state = {
                    isLocked: false,
                };

                actions.disableScroll({ commit, state }, { isLocked: true });

                const [disableScrollEvent] = commit.args;

                expect(disableScrollEvent).to.be.deep.equal([DISABLE_SCROLL, { isLocked: true }]);
            });
        });
    });

    describe('Mutations', () => {
        it('Set scroll', () => {
            const state = {
                position: 1,
                progress: 0.5,
                scrollbarWidth: 1000,
            };

            scrollModule.mutations[SET_SCROLL](state);

            expect(state.position).to.be.equal(0);
            expect(state.progress).to.be.equal(0);
            expect(state.scrollbarWidth).to.be.equal(getScrollbarWidth());
        });

        it('Disable scroll', () => {
            const state = {
                isLocked: false,
            };

            scrollModule.mutations[DISABLE_SCROLL](state, { isLocked: true });

            expect(state.isLocked).to.be.equal(true);
        });
    });
});
