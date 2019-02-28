<template>
    <div class="ui-modal" :class="bemFacets">
        <div class="ui-modal--close-wrap">
            <div class="ui-modal--close">
                <button class="ui-modal--close-button" @click.prevent="$emit('close')">
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
    import { mapActions } from 'vuex';
    import bemMixin from '../../mixins/bem';

    export default {
        mixins: [
            bemMixin('ui-modal'),
        ],
        methods: {
            ...mapActions('vue-ui/overlay', ['closeOverlay']),
            hasSlot(name) {
                return this.$scopedSlots[name] || this.$slots[name];
            },
        },
    };
</script>
