import { expect } from 'chai';
import { spy } from 'sinon';
import * as getters from './getters';
import * as actions from './actions';
import cloneDeep from 'lodash.clonedeep';
import { CLOSE_OVERLAY, MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, UNMOUNT_OVERLAY } from '../mutation-types';
import overlayModule, { DEFAULT_OPENING_STATE, DEFAULT_CLOSING_STATE } from './index';

function dummyOverlay(options = {}) {
    return {
        ...cloneDeep(DEFAULT_OPENING_STATE),
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
    }, cloneDeep(overlayModule.state));
}

describe('Overlay spec', () => {
    describe('Overlays default export', () => {
        it('The overlay module exports properly all the vuex properties', () => {
            const props = ['namespaced', 'mutations', 'actions', 'getters', 'state'];

            props.forEach(prop => {
                expect(overlayModule).to.have.property(prop);
            });
        });
    });

    describe('Getters', () => {
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

    describe('Actions', () => {
        describe('OpenOverlay', () => {
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

            it('Closing an overlay allows also custom transitions', async function() {
                const commit = spy();
                const initialOverlay = dummyOverlay({ title: 'Hello' });
                const state = generateStateFromOverlaysList([initialOverlay]);
                const customTransitionName = 'my-cool-transition';

                await actions.closeOverlay({ commit, state }, {
                    id: initialOverlay.id,
                    transition: customTransitionName,
                });

                const [, closeOverlaysEvent] = commit.args;
                const [, closeEventData] = closeOverlaysEvent;

                closeEventData.onAfterClose();

                expect(closeEventData.transition).to.be.equal(customTransitionName);
            });

            it('Closing unknown overlays will not dispatch any event', async function() {
                const commit = spy();
                const state = generateStateFromOverlaysList([]);

                await actions.closeOverlay({ commit, state }, { id: 'unknown' });

                expect(commit.args).to.have.length(0);
            });
        });
    });

    describe('Mutations', () => {
        it('Mount overlay', () => {
            const state = generateStateFromOverlaysList([]);
            const id = 'foo';

            overlayModule.mutations[MOUNT_OVERLAY](state, { id });

            expect(state.overlays[id]).to.be.deep.equal(DEFAULT_CLOSING_STATE);
        });

        it('Unmount overlay', () => {
            const overlayToRemove = dummyOverlay();
            const state = generateStateFromOverlaysList([overlayToRemove]);

            overlayModule.mutations[UNMOUNT_OVERLAY](state, { id: overlayToRemove.id });

            expect(state.overlays).to.be.deep.equal({});
        });

        it('Open overlay', () => {
            const overlayToOpen = dummyOverlay();
            const state = generateStateFromOverlaysList([overlayToOpen]);
            const overlayTitle = 'Hello';

            overlayModule.mutations[OPEN_OVERLAY](state, { id: overlayToOpen.id, title: overlayTitle });


            expect(state.overlays[overlayToOpen.id].isOpen).to.be.equal(true);
            expect(state.overlays[overlayToOpen.id].disableScroll).to.be.equal(true);
            expect(state.overlays[overlayToOpen.id].title).to.be.equal(overlayTitle);
        });

        it('Prepare closing overlay', () => {
            const overlayToClose = dummyOverlay();
            const state = generateStateFromOverlaysList([overlayToClose]);
            const customTransitionName = 'my-cool-transition';

            overlayModule.mutations[PREPARE_CLOSE_OVERLAY](state, { id: overlayToClose.id, transition: customTransitionName });

            expect(state.overlays[overlayToClose.id].isOpen).to.be.equal(true);
            expect(state.overlays[overlayToClose.id].disableScroll).to.be.equal(false);
            expect(state.overlays[overlayToClose.id].transition).to.be.equal(customTransitionName);
        });

        it('Prepare closing unknown overlay', () => {
            const overlayToClose = dummyOverlay();
            const state = generateStateFromOverlaysList([]);
            const customTransitionName = 'my-cool-transition';

            overlayModule.mutations[PREPARE_CLOSE_OVERLAY](state, { id: overlayToClose.id, transition: customTransitionName });

            expect(state.overlays).to.be.deep.equal({});
        });

        it('Close overlay', () => {
            const overlayToClose = dummyOverlay();
            const state = generateStateFromOverlaysList([overlayToClose]);

            overlayModule.mutations[CLOSE_OVERLAY](state, { id: overlayToClose.id });

            expect(state.overlays[overlayToClose.id].isOpen).to.be.equal(false);
            expect(state.overlays[overlayToClose.id].disableScroll).to.be.equal(false);
        });
    });
});
