/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import { spy } from 'sinon';
import * as getters from './getters';
import * as actions from './actions';
import { MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, CLOSE_OVERLAY, UNMOUNT_OVERLAY } from '../mutation-types';
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

    describe('actions', () => {
        describe('openOverlay', () => {
            it('Opening a new overlay dispatches properly all the mutations', async function() {
                const commit = spy();
                const state = generateStateFromOverlaysList([]);
                const newOverlay = dummyOverlay({ title: 'Hello' });

                await actions.openOverlay({ commit, state }, newOverlay);

                const [mountEventArgs, openEventArgs] = commit.args;
                const [openEventMutationType, openEventOverlayData] = openEventArgs;

                expect(mountEventArgs).to.be.deep.equal([MOUNT_OVERLAY, { id: newOverlay.id }]);
                expect(openEventMutationType).to.be.equal(OPEN_OVERLAY);
                expect(openEventOverlayData.title).to.be.equal(newOverlay.title, 'The payload was properly forwarded');
            });

            it('Opening twice the same overlay will not dispatch again the mounting mutation', async function() {
                const commit = spy();
                const overlayID = 'foo';
                const initialOverlay = dummyOverlay({ title: 'Hello', id: overlayID });
                const state = generateStateFromOverlaysList([initialOverlay]);
                const newOverlay = dummyOverlay({ title: 'World', id: overlayID });

                await actions.openOverlay({ commit, state }, newOverlay);

                const [openEventMutationType, openEventOverlayData] = commit.args[0];

                expect(commit.args).to.have.length(1);
                expect(openEventMutationType).to.be.equal(OPEN_OVERLAY);
                expect(openEventOverlayData.title).to.be.equal(newOverlay.title, 'The payload was properly forwarded');
            });
        });

        describe('closeOverlay', () => {
            it('Closing an overlay dispatches properly all the mutations', async function() {
                const commit = spy();
                const initialOverlay = dummyOverlay({ title: 'Hello' });
                const state = generateStateFromOverlaysList([initialOverlay]);

                await actions.closeOverlay({ commit, state }, { id: initialOverlay.id });

                const [prepareCloseEvent, closeOverlaysEvent] = commit.args;
                const [prepareCloseMutationType, prepareCloseData] = prepareCloseEvent;
                const [closeEventMutationType, closeEventData] = closeOverlaysEvent;

                expect(prepareCloseMutationType).to.be.equal(PREPARE_CLOSE_OVERLAY);
                expect(prepareCloseData.id).to.be.equal(initialOverlay.id);

                expect(closeEventMutationType).to.be.equal(CLOSE_OVERLAY);
                expect(closeEventData.id).to.be.equal(initialOverlay.id);
            });

            it('Closing an overlay allows to asynchronously dispatch the unmount event', async function() {
                const commit = spy();
                const initialOverlay = dummyOverlay({ title: 'Hello' });
                const state = generateStateFromOverlaysList([initialOverlay]);

                await actions.closeOverlay({ commit, state }, { id: initialOverlay.id });

                const [, closeOverlaysEvent] = commit.args;
                const [, closeEventData] = closeOverlaysEvent;

                // this can be called by vue components at any time
                closeEventData.onAfterClose();

                const [, , unmountOverlayEvent] = commit.args;
                const [unmountEventMutationType, umountEventData] = unmountOverlayEvent;

                expect(unmountEventMutationType).to.be.equal(UNMOUNT_OVERLAY);
                expect(umountEventData.id).to.be.equal(initialOverlay.id);
            });

            it('Closing unknown overlays will not dispatch any event', async function() {
                const commit = spy();
                const state = generateStateFromOverlaysList([]);

                await actions.closeOverlay({ commit, state }, { id: 'unknown' });

                expect(commit.args).to.have.length(0);
            });
        });
    });
});
