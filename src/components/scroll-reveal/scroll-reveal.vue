<template>
    <div :class="bemRoot">
        <slot/>
    </div>
</template>

<script>

    import Headroom from 'headroom.js';
    import bemMixin from '../../mixins/bem';

    export default {
        mixins: [bemMixin('')],
        props: {
            bemRoot: {
                type: String,
                required: true,
            },
        },

        mounted() {
            const headroom = new Headroom(this.$el, {
                classes: {
                    initial: this.bemRoot,
                    pinned: this.bemAdd('pinned', null, this.bemRoot),
                    unpinned: this.bemAdd('unpinned', null, this.bemRoot),
                    top: this.bemAdd('top', null, this.bemRoot),
                    notTop: this.bemAdd('not-top', null, this.bemRoot),
                    bottom: this.bemAdd('bottom', null, this.bemRoot),
                    notBottom: this.bemAdd('not-bottom', null, this.bemRoot),
                },
            });
            headroom.init();
        },
    };
</script>
