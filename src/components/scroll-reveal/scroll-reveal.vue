<template>
    <div :class="elementClass">
        <slot/>
    </div>
</template>

<script>
    import Headroom from 'headroom.js';
    import bemMixin from '../../mixins/bem';

    export default {
        mixins: [bemMixin('')],
        props: {
            elementClass: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                headroom: null,
            };
        },

        mounted() {
            this.headroom = new Headroom(this.$el, {
                ...this.$attrs,
                classes: {
                    initial: this.elementClass,
                    pinned: this.bemAdd('pinned', null, this.elementClass),
                    unpinned: this.bemAdd('unpinned', null, this.elementClass),
                    top: this.bemAdd('top', null, this.elementClass),
                    notTop: this.bemAdd('not-top', null, this.elementClass),
                    bottom: this.bemAdd('bottom', null, this.elementClass),
                    notBottom: this.bemAdd('not-bottom', null, this.elementClass),
                },
                onPin: () => {
                    this.$emit('pin');
                },
                onUnpin: () => {
                    this.$emit('unpin');
                },
                onTop: () => {
                    this.$emit('top');
                },
                onNotTop: () => {
                    this.$emit('not-top');
                },
                onBottom: () => {
                    this.$emit('bottom');
                },
                onNotBottom: () => {
                    this.$emit('not-bottom');
                },
            });
            this.headroom.init();
        },
        beforeDestroy() {
            this.headroom.destroy();
        },
    };
</script>
