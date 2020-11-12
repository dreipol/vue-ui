<template>
    <div class="ui-tabs">
        <ul class="ui-tabs--list" role="tablist">
            <li :class="tabClasses(tab)"
                    class="ui-tabs--list-item"
                    role="tab"
                    :tabindex="index === activeId ? 0 : -1"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click.prevent="activeTab(tab)"
                    @keypress.enter="activeTab(tab)">
                <slot name="tab" v-bind="getTabData(tab)"/>
            </li>
        </ul>
        <ui-tab :tabs="tabs" :active-id="activeId" :is-lazy="isLazy"/>
    </div>
</template>

<script>
    import { bemMixin } from '../../mixins';
    import UiTab from './tab.vue';
    
    export default {
        components: {
            UiTab,
        },
        mixins: [
            bemMixin('ui-tabs'),
        ],
        props: {
            initActiveId: {
                type: Number,
                default: 0,
            },
            isLazy: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                activeId: this.initActiveId,
            };
        },
        computed: {
            tabs() {
                return this.$scopedSlots.content();
            },
        },
        methods: {
            tabClasses(tab) {
                const isActive = this.tabs.indexOf(tab) === this.activeId;
                return [
                    this.bemAdd(isActive && 'is-active', 'list-item'),
                ];
            },
            activeTab(tab) {
                this.activeId = this.tabs.indexOf(tab);
            },
            getTabData(tab) {
                return tab.data ? tab.data.attrs : {};
            },
        },
    };
</script>
