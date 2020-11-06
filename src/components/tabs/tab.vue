<template>
    <div :class="rootClasses"
            class="ui-tabs--content-wrapper"
            ref="body"
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
                console.log(this.isActive);
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
        },
        methods: {
            onTransitionEnd() {
                this.isAnimating = false;
            },
        },
    };
</script>
