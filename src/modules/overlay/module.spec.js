/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import * as getters from './getters';
import { state as initialState } from './index';

function dummyOverlay() {
    return {
        id: `${ Math.random() }`,
        facets: ['test'],
        component: 'modal',
        lockScroll: false,
        props: {},
        autoClose: {
            transition: 'fade',
            delay: 4000,
        },
    };
}

function dummyOpenedOverlay() {
    return {
        ...dummyOverlay(),
        isOpen: true,
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
        it('No Overlays opened found', () => {
            const state = generateStateFromOverlaysList([dummyOverlay()]);

            expect(getters.hasOpenOverlays(state)).to.be.equal(false);
        });

        it('No Overlays opened found (empty overlays object)', () => {
            const state = generateStateFromOverlaysList([]);

            expect(getters.hasOpenOverlays(state)).to.be.equal(false);
        });

        it('A opened Overlay was found', () => {
            const state = generateStateFromOverlaysList([dummyOverlay(), dummyOpenedOverlay()]);

            expect(getters.hasOpenOverlays(state)).to.be.equal(true);
        });

        it('A opened Overlay was found (multiple opened overlays)', () => {
            const state = generateStateFromOverlaysList([dummyOpenedOverlay(), dummyOverlay(), dummyOpenedOverlay()]);

            expect(getters.hasOpenOverlays(state)).to.be.equal(true);
        });
    });
});
