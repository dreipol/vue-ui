<template>
    <div :class="rootClasses"
            class="ui-tab"
            ref="body"
            @transitionend="onTransitionEnd">
        <div class="ui-tab--body" v-if="renderAlways" v-show="changed">
            <slot name="tab-body"/>
        </div>
        <div class="ui-tab--body" v-else-if="changed">
            <slot name="tab-body"/>
        </div>
    </div>
</template>


<script>
    import { bemMixin } from '../../mixins';
    
    
    export default {
        mixins: [
            bemMixin('ui-tab'),
        ],
        props: {
            tabId: {
                type: Number || null,
                default: null,
            },
            hasAnimation: {
                type: Boolean || null,
                default: null,
            },
            href: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                isActive: false,
                isAnimating: false,
                setHasAnimation: false,
                renderAlways: false,
            };
        },
        computed: {
            hasTransition() {
                if (this.hasAnimation !== null) {
                    return this.hasAnimation;
                }
                return this.setHasAnimation;
            },
            changed() {
                if (!this.isActive && this.isAnimating && this.hasTransition) {
                    return !this.isActive && this.isAnimating;
                }
                return this.isActive;
            },
            rootClasses() {
                return [
                    this.bemFacets,
                    this.bemIf(!this.isActive && this.isAnimating, 'is-closing'),
                    this.bemIf(this.isActive && this.isAnimating, 'is-opening'),
                    this.bemIf(this.isActive && !this.isAnimating, 'is-active'),
                ];
            },
            calcHeight() {
                return this.$refs.body.offsetHeight;
            },
            
        },
        methods: {
            onTransitionEnd() {
                this.isAnimating = false;
            },
        },
    };
</script>
