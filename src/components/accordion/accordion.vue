<template>
    <div class="ui-accordion" :class="rootClasses">
        <button type="button"
                class="u-reset ui-accordion--head"
                v-if="!!$scopedSlots.head"
                :aria-expanded="state.isOpen ? 'true' : 'false'"
                @click.prevent="onRequestChange(!state.isOpen)">
            <slot name="head" :is-open="state.isOpen"/>
        </button>
        <div class="ui-accordion--body"
                ref="body"
                @transitionend="onTransitionEnd">
            <slot name="body" :is-open="state.isOpen" :is-visible="isVisible"/>
        </div>
    </div>
</template>

<script>
    import { forceReflow } from 'bianco';
    import isMountedMixin from '../../mixins/is-mounted';
    import bemMixin from '../../mixins/bem';

    const TRANSITION_END_KEY_PROP = 'max-height';

    export default {
        mixins: [
            isMountedMixin,
            bemMixin('ui-accordion'),
        ],
        props: {
            isOpen: {
                type: Boolean,
                default: false,
            },
            isPassive: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                state: {
                    isAnimating: false,
                    isOpen: this.isOpen,
                },
            };
        },
        computed: {
            isVisible() {
                const wasOpened = this.state.isOpen && !this.state.isAnimating;
                const isClosing = !this.state.isOpen && this.state.isAnimating;

                return isClosing || wasOpened;
            },
            rootClasses() {
                return [
                    this.bemFacets,
                    this.bemIf(this.state.isAnimating, 'is-animating'),
                    this.bemIf(this.isMounted && this.state.isOpen, 'is-open'),
                ];
            },
        },

        methods: {
            change(val) {
                this.state.isOpen = val;
                this.state.isAnimating = true;
                this.$nextTick(this.startAnimation);
            },
            startAnimation() {
                const { body } = this.$refs;

                body.style.maxHeight = `${ body.scrollHeight }px`;

                // NOTE: Make the accordion animations smooth on any browser
                if (!this.state.isOpen) {
                    forceReflow(body);
                    body.style.maxHeight = '0px';
                }

                this.$emit('change', this.state.isOpen);
            },
            onRequestChange(isOpen) {
                this.$emit('request-change', isOpen);
            },
            onTransitionEnd(event) {
                const isTargetElement = event.target === this.$refs.body;
                const isTargetProperty = event.propertyName === TRANSITION_END_KEY_PROP;

                if (!isTargetElement || !isTargetProperty) {
                    return;
                }

                this.finishAnimation();
                this.$emit('changed', this.state.isOpen);
            },
            finishAnimation() {
                this.state.isAnimating = false;

                if (this.state.isOpen) {
                    this.$refs.body.style.maxHeight = 'inherit';
                }
            },
        },
        mounted() {
            // NOTE: The accordion handles its state by itself when `isPassive` is false
            if (this.isPassive) {
                this.$watch('isOpen', this.change);
            } else {
                this.$on('request-change', this.change);
            }

            // NOTE: If it's opened by default we init the component already opened
            this.finishAnimation();
        },
    };
</script>
