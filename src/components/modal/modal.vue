<template>
    <div class="modal" :class="bemFacets">
        <div class="modal--close-wrap">
            <div class="modal--close">
                <button class="modal--close-button" @click.prevent="onCloseRequested">
                    <!-- TODO: handle icons -->
                </button>
            </div>
        </div>

        <header class="modal--header" v-if="!!$slots.header">
            <slot name="header"/>
        </header>
        <main class="modal--body" v-if="!!$slots.default">
            <slot/>
        </main>
        <footer class="modal--footer" v-if="!!$slots.footer">
            <slot name="footer"/>
        </footer>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import bemMixin from '../../mixins/bem';

    export default {
        mixins: [
            bemMixin('modal'),
        ],
        methods: {
            onCloseRequested() {
                this.$emit('modal:close');
            },
        },
    };
</script>
