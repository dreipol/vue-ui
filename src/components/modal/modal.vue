<template>
    <div class="ui-modal" :class="bemFacets">
        <div class="ui-modal--close-wrap">
            <div class="ui-modal--close">
                <button class="ui-modal--close-button" @click.prevent="onCloseRequested">
                    <!-- TODO: handle icons -->
                </button>
            </div>
        </div>

        <header class="ui-modal--header" v-if="$scopedSlots.header">
            <slot name="header"/>
        </header>
        <main class="ui-modal--body" v-if="$scopedSlots.body">
            <slot name="body"/>
        </main>
        <footer class="ui-modal--footer" v-if="$scopedSlots.footer">
            <slot name="footer"/>
        </footer>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem';

    export default {
        mixins: [
            bemMixin('ui-modal'),
        ],
        methods: {
            onCloseRequested() {
                this.$emit('close');
            },
        },
    };
</script>
