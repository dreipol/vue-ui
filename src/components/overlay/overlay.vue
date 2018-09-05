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
                    <div class="overlay--wrap-outer" :style="overlayScrollLockStyles">
                        <div class="overlay--wrap-inner">
                            <div class="overlay--backdrop-click-area" @click.prevent="closeOverlay({ id })"/>
                            <div class="overlay--container">
                                <div class="overlay--revealer">
                                    <ui-modal :facets="overlay.facets" @modal:close="closeOverlay({ id })">
                                        <component slot :is="overlay.component" v-bind="overlay.props"/>
                                    </ui-modal>
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
    import UiModal from '../modal/modal.vue';
    import scrollLockHelperMixin from '../../mixins/scroll-lock-helper';


    export default {
        mixins: [
            bemMixin('overlay'),
            scrollLockHelperMixin,
        ],
        components: {
            UiModal,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                hasDisabledScroll: null,
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
            overlayScrollLockStyles() {
                return this.hasDisabledScroll ? {} : this.scrollLockStyles;
            },
        },
        methods: {
            ...mapActions('scroll', ['disableScroll']),
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
                this.hasDisabledScroll = this.overlay.disableScroll;
                this.overlay.disableScroll && this.disableScroll({ isLocked: true });
            },
            onAfterEnterHook() {
                this.setAutoClose();
            },
            onAfterLeaveHook() {
                const { onAfterClose } = this.overlay;
                onAfterClose && onAfterClose();
                !this.hasScrollLockingOverlays && this.disableScroll({ isLocked: false });
            },
        },
    };
</script>
