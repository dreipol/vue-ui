<template>
    <div class="ui-modal" :class="bemFacets">
        <div class="ui-modal--close-wrap">
            <div class="ui-modal--close">
                <button class="ui-modal--close-button" @click.prevent="$emit('close')">
                    <!-- TODO: handle icons -->
                </button>
            </div>
        </div>

        <header class="ui-modal--header" v-if="hasSlot('header')">
            <slot name="header"/>
        </header>
        <main class="ui-modal--body" v-if="hasSlot('body')">
            <slot name="body"/>
        </main>
        <footer class="ui-modal--footer" v-if="hasSlot('footer')">
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
