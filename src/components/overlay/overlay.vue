<template>
    <div class="overlay" :class="rootClasses">
        <transition :name="overlay.transition"
                mode="out-in"
                @enter="onEnterHook"
                @afterEnter="onAfterEnterHook"
                @afterLeave="onAfterLeaveHook">
            <div class="overlay--root" v-if="overlay.isOpen" :key="overlay.timestamp">
                <div class="overlay--backdrop"></div>
                <div class="overlay--display">
                    <div class="overlay--wrap-outer">
                        <div class="overlay--wrap-inner">
                            <div class="overlay--backdrop-click-area"
                                    @click.prevent="closeOverlay({ id })"></div>
                            <div class="overlay--container">
                                <div class="overlay--revealer">
                                    <cmp-modal :facets="overlay.facets">
                                        <component slot :is="overlay.component" v-bind="overlay.props"/>
                                    </cmp-modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import bemMixin from '../../mixins/bem';
    import scrollLockHelperMixin from '../../mixins/scroll-lock-helper';


    export default {
        mixins: [
            bemMixin('overlay'),
            scrollLockHelperMixin,
        ],
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                autoCloseTimeout: null,
            };
        },
        computed: {
            ...mapState('overlay', ['overlays']),
            ...mapGetters('overlay', ['hasScrollLockingOverlays']),
            rootClasses() {
                const { facets } = this.overlay;

                if (!facets) {
                    return [];
                }

                return facets.map(facet => this.bemAdd(facet));
            },
            overlay() {
                return this.overlays[this.id] || {};
            },
        },
        methods: {
            ...mapActions('scroll', ['lockScroll']),
            ...mapActions('overlay', ['closeOverlay']),
            setAutoClose() {
                const { autoClose, id } = this.overlay;

                clearTimeout(this.autoCloseTimeout);

                if (!autoClose) {
                    return;
                }

                this.autoCloseTimeout = setTimeout(() => {
                    this.closeOverlay({ id, ...autoClose });
                }, autoClose.delay || 0);
            },
            onEnterHook() {
                this.overlay.lockScroll && this.lockScroll({ isLocked: true });
            },
            onAfterEnterHook() {
                this.setAutoClose();
            },
            onAfterLeaveHook() {
                const { onAfterClose } = this.overlay;
                onAfterClose && onAfterClose();
                !this.hasScrollLockingOverlays && this.lockScroll({ isLocked: false });
            },
        },
    };
</script>
