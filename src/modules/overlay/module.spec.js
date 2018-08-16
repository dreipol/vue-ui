/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import * as getters from './getters';
import { DEFAULT_OPENING_STATE, state as initialState } from './index';

function dummyOverlay(options = {}) {
    return {
        ...DEFAULT_OPENING_STATE,
        id: `${ Math.random() }`,
        ...options,
    };
}

function generateStateFromOverlaysList(overlays) {
    return overlays.reduce((state, overlay) => {
        return {
            state,
            overlays: {
                ...state.overlays,
                [overlay.id]: overlay,
            },
        };
    }, { ...initialState });
}

describe('Overlay spec', () => {
    describe('getters', () => {
        describe('hasOpenOverlays', () => {
            it('No Overlays opened found', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ isOpen: false })]);

                expect(getters.hasOpenOverlays(state)).to.be.equal(false);
            });

            it('No Overlays opened found (empty overlays object)', () => {
                const state = generateStateFromOverlaysList([]);

                expect(getters.hasOpenOverlays(state)).to.be.equal(false);
            });

            it('A opened Overlay was found', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ isOpen: false }), dummyOverlay({ isOpen: true })]);

                expect(getters.hasOpenOverlays(state)).to.be.equal(true);
            });

            it('A opened Overlay was found (multiple opened overlays)', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ isOpen: true }), dummyOverlay({ isOpen: false }), dummyOverlay({ isOpen: true })]);

                expect(getters.hasOpenOverlays(state)).to.be.equal(true);
            });
        });

        describe('hasScrollLockingOverlays', () => {
            it('No Overlays disable the page scroll', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ disableScroll: false })]);

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(false);
            });

            it('No Overlays disable the page scroll (empty overlays object)', () => {
                const state = generateStateFromOverlaysList([]);

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(false);
            });

            it('A Overlay disables the page scroll', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ disableScroll: true })]);

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(true);
            });

            it('Multiple Overlays disable the page scroll', () => {
                const state = generateStateFromOverlaysList([dummyOverlay({ disableScroll: true }), dummyOverlay({ disableScroll: false }), dummyOverlay({ disableScroll: true })]);

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(true);
            });
        });
    });
});
