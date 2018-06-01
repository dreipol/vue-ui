<template>
    <div class="modal" :class="bemFacet">
        <div class="modal--close-wrap">
            <div class="modal--close">
                <button class="modal--close-button" @click.prevent="closeOverlay">
                    <cmp-icon symbol="close" size="large"></cmp-icon>
                </button>
            </div>
        </div>

        <header class="modal--header" v-if="!!$slots.header">
            <slot name="header"></slot>
        </header>
        <main class="modal--body" v-if="!!$slots.default">
            <slot></slot>
        </main>
        <footer class="modal--footer" v-if="!!$slots.footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import bemMixin from 'framework/mixins/bem';


    export default {
        mixins: [
            bemMixin('modal'),
        ],
        methods: {
            ...mapActions('overlay', ['closeOverlay']),
        },
    };
</script>
