<template>
    <div :class="bemRoot">
        <slot/>
    </div>
</template>

<script>

    import Headroom from 'headroom.js';

    export default {
        props: {
            bemRoot: {
                type: String,
                required: true,
            },
        },

        mounted() {
            const headroom = new Headroom(this.$el, {
                classes: {
                    initial: `${ this.bemRoot }`,
                    pinned: `${ this.bemRoot }__pinned`,
                    unpinned: `${ this.bemRoot }__unpinned`,
                    top: `${ this.bemRoot }__on-top`,
                    notTop: `${ this.bemRoot }__not-on-top`,
                    bottom: `${ this.bemRoot }__on-bottom`,
                    notBottom: `${ this.bemRoot }__not-on-bottom`,
                },
            });
            headroom.init();
        },
    };
</script>
