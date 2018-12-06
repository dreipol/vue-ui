/* eslint-disable  max-lines-per-function */
import { CLOSE_OVERLAY, MOUNT_OVERLAY, OPEN_OVERLAY, PREPARE_CLOSE_OVERLAY, UNMOUNT_OVERLAY } from '../mutation-types';
import * as getters from './getters';
import * as actions from './actions';
import overlayModule, { DEFAULT_CLOSING_STATE } from './';

import { expect } from 'chai';
import { spy } from 'sinon';

describe('Vuex overlay', () => {
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
            it('No active overlays count as if there is none open', () => {
                const state = {
                    overlays: {},
                };

                expect(getters.hasOpenOverlays(state)).to.be.equal(false);
            });

            it('Closed overlays are not taken into account', () => {
                const state = {
                    overlays: {
                        foo: { isOpen: false },
                    },
                };

                expect(getters.hasOpenOverlays(state)).to.be.equal(false);
            });

            it('Open overlays are reported', () => {
                const state = {
                    overlays: {
                        foo: { isOpen: false },
                        bar: { isOpen: true },
                    },
                };

                expect(getters.hasOpenOverlays(state)).to.be.equal(true);
            });

            it('Multiple open overlays are reported', () => {
                const state = {
                    overlays: {
                        foo: { isOpen: true },
                        baz: { isOpen: true },
                        bar: { isOpen: false },
                    },
                };

                expect(getters.hasOpenOverlays(state)).to.be.equal(true);
            });
        });

        describe('hasScrollLockingOverlays', () => {
            it('No active overlays count as if there is none disabling page scroll', () => {
                const state = {
                    overlays: {},
                };

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(false);
            });

            it('Overlays that do not disable page scroll are not taken into account', () => {
                const state = {
                    overlays: {
                        foo: { disableScroll: false },
                    },
                };

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(false);
            });

            it('An overlay disabling page scroll is reported', () => {
                const state = {
                    overlays: {
                        foo: { disableScroll: true },
                    },
                };

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(true);
            });

            it('Multiple overlays disabling page scroll are reported', () => {
                const state = {
                    overlays: {
                        foo: { disableScroll: true },
                        baz: { disableScroll: true },
                        bar: { disableScroll: false },
                    },
                };

                expect(getters.hasScrollLockingOverlays(state)).to.be.equal(true);
            });
        });
    });

    describe('Actions', () => {
        describe('openOverlay', () => {
            it('Opening a new overlay dispatches all mutations properly', async function() {
                const commit = spy();
                const state = { overlays: {} };

                await actions.openOverlay({ commit, state }, {
                    id: 'foo',
                    component: { render: () => null },
                    props: { title: 'bar' },
                });

                const [mountOverlayEventArgs, openOverlayEventArgs] = commit.args;
                const [openOverlayEventMutationType, openOverlayEventData] = openOverlayEventArgs;

                expect(mountOverlayEventArgs).to.be.deep.equal([MOUNT_OVERLAY, { id: 'foo' }]);
                expect(openOverlayEventMutationType).to.be.equal(OPEN_OVERLAY);

                expect(openOverlayEventData.props.title).to.to.not.be.undefined;
                expect(openOverlayEventData.props.title).to.be.equal('bar', 'The payload was properly forwarded');
            });

            it('Opening the same overlay twice will not dispatch the mounting mutation again', async function() {
                const commit = spy();
                const state = {
                    overlays: {
                        foo: { props: { title: 'bar' } },
                    },
                };

                await actions.openOverlay({ commit, state }, {
                    id: 'foo',
                    component: { render: () => null },
                    props: { title: 'baz' },
                });

                const [openOverlayEventMutationType, openOverlayEventData] = commit.args[0];

                expect(commit.args).to.have.length(1);
                expect(openOverlayEventMutationType).to.be.equal(OPEN_OVERLAY);
                expect(openOverlayEventData.props.title).to.to.not.be.undefined;
                expect(openOverlayEventData.props.title).to.be.equal('baz', 'The payload was properly forwarded');
            });
        });

        describe('closeOverlay', () => {
            it('Closing an overlay properly dispatches all mutations', async function() {
                const commit = spy();
                const state = {
                    overlays: {
                        foo: { props: { title: 'bar' } },
                    },
                };

                await actions.closeOverlay({ commit, state }, { id: 'foo' });

                const [prepareCloseEvent, closeOverlaysEvent] = commit.args;
                const [prepareCloseMutationType, prepareCloseData] = prepareCloseEvent;
                const [closeEventMutationType, closeEventData] = closeOverlaysEvent;

                expect(prepareCloseMutationType).to.be.equal(PREPARE_CLOSE_OVERLAY);
                expect(prepareCloseData.id).to.be.equal('foo');

                expect(closeEventMutationType).to.be.equal(CLOSE_OVERLAY);
                expect(closeEventData.id).to.be.equal('foo');
            });

            it('Closing an overlay allows to asynchronously dispatch the unmount event', async function() {
                const commit = spy();
                const state = {
                    overlays: {
                        foo: { id: 'foo', props: { title: 'bar' } },
                    },
                };

                await actions.closeOverlay({ commit, state }, { id: 'foo' });
                actions.unmountOverlay({ commit, state }, { id: 'foo' });

                const [, , unmountOverlayEvent] = commit.args;
                const [unmountOverlayEventMutationType, umountOverlayEventData] = unmountOverlayEvent;

                expect(unmountOverlayEventMutationType).to.be.equal(UNMOUNT_OVERLAY);
                expect(umountOverlayEventData.id).to.be.equal('foo');
            });

            it('Closing an overlay allows for custom transitions', async function() {
                const commit = spy();
                const state = {
                    overlays: {
                        foo: { id: 'foo', props: { title: 'bar' } },
                    },
                };

                await actions.closeOverlay({ commit, state }, { id: 'foo', transition: 'my-cool-transition' });

                const [, closeOverlaysEvent] = commit.args;
                const [, closeEventData] = closeOverlaysEvent;

                expect(closeEventData.transition).to.be.equal('my-cool-transition');
            });

            it('Closing unknown overlays will not dispatch any event', async function() {
                const commit = spy();
                const state = { overlays: {} };

                await actions.closeOverlay({ commit, state }, { id: 'unknown' });

                expect(commit.args).to.have.length(0);
            });
        });
    });

    describe('Mutations', () => {
        it('Mount overlay', () => {
            const state = { overlays: {} };

            overlayModule.mutations[MOUNT_OVERLAY](state, { id: 'foo' });

            expect(state.overlays['foo']).to.be.deep.equal(DEFAULT_CLOSING_STATE);
        });

        it('Unmount overlay', () => {
            const state = {
                overlays: {
                    foo: {},
                },
            };

            overlayModule.mutations[UNMOUNT_OVERLAY](state, { id: 'foo' });

            expect(state.overlays).to.be.deep.equal({});
        });

        it('Open overlay', () => {
            const state = {
                overlays: {},
            };

            overlayModule.mutations[OPEN_OVERLAY](state, { id: 'foo', props: { title: 'bar' } });

            expect(state.overlays.foo.isOpen).to.be.equal(true);
            expect(state.overlays.foo.disableScroll).to.be.equal(true);
            expect(state.overlays.foo.props.title).to.be.equal('bar');
        });

        it('Prepare closing overlay', () => {
            const state = {
                overlays: {
                    foo: { isOpen: true },
                },
            };

            overlayModule.mutations[PREPARE_CLOSE_OVERLAY](state, {
                id: 'foo',
                transition: 'my-cool-transition',
            });

            expect(state.overlays.foo.isOpen).to.be.equal(true);
            expect(state.overlays.foo.disableScroll).to.be.equal(false);
            expect(state.overlays.foo.transition).to.be.equal('my-cool-transition');
        });

        it('Prepare closing unknown overlays', () => {
            const state = {
                overlays: {
                    foo: {},
                },
            };

            overlayModule.mutations[PREPARE_CLOSE_OVERLAY](state, {
                id: 'unknown',
            });

            expect(state.overlays).to.be.deep.equal({ foo: {} });
        });

        it('Close overlay', () => {
            const state = {
                overlays: {
                    foo: { isOpen: true, disableScroll: true },
                },
            };

            overlayModule.mutations[CLOSE_OVERLAY](state, { id: 'foo' });

            expect(state.overlays.foo.isOpen).to.be.equal(false);
            expect(state.overlays.foo.disableScroll).to.be.equal(false);
        });
    });
});
