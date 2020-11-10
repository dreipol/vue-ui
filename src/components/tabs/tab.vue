<template>
    <div :class="rootClasses"
            class="ui-tabs--content-wrapper"
            @transitionend="onTransitionEnd">
        <div class="ui-tabs--content" v-if="renderAlways" v-show="changed">
            <slot name="tab-content"/>
        </div>
        <div class="ui-tabs--content" v-else-if="changed">
            <slot name="tab-content"/>
        </div>
    </div>
</template>


<script>
    import { bemMixin } from '../../mixins';
    
    
    export default {
        mixins: [
            bemMixin('ui-tabs--content-wrapper'),
        ],
        props: {
            tabId: {
                type: Number || null,
                default: null,
            },
            href: {
                type: String,
                default: '',
            },
            hasAnimation: {
                type: Boolean || null,
                default: null,
            },
        },
        data() {
            return {
                isActive: false,
                isAnimating: false,
                setHasAnimation: null,
                renderAlways: false,
            };
        },
        computed: {
            isAnimationDone() {
                return this.hasTransition ? !this.isAnimating : true;
            },
            hasTransition() {
                return this.hasAnimation === null ? this.setHasAnimation : this.hasAnimation;
            },
            changed() {
                //Check if we can override Tab Props
                if (!this.isActive && !this.isAnimationDone) {
                    return !this.isActive;
                }
                return this.isActive;
            },
            rootClasses() {
                return [
                    this.bemFacets,
                    this.bemIf(!this.isActive && !this.isAnimationDone, 'is-closing'),
                    this.bemIf(this.isActive && !this.isAnimationDone, 'is-opening'),
                    this.bemIf(this.isActive && this.isAnimationDone, 'is-active'),
                ];
            },
        },
        methods: {
            onTransitionEnd() {
                this.isAnimating = false;
            },
        },
    };
</script>
