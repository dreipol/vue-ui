<template>
    <div class="ui-tabs">
        <ul class="ui-tabs__list" role="tablist">
            <li :class="tabClasses(tab)"
                    class="ui-tabs__list-item"
                    role="tab"
                    :tabindex="0"
                    :aria-selected="index === activeId"
                    v-for="(tab, index) in tabs"
                    :id="tab.uuid"
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
    import uuidGenerator from '../../util/misc/uuid';

    export default {
        components: {
            UiTab,
        },
        mixins: [
            bemMixin('ui-tabs'),
        ],
        props: {
            initialActiveId: {
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
                activeId: this.initialActiveId,
            };
        },
        computed: {
            tabs() {
                return this.$scopedSlots.content().map(tab => {
                    tab.uuid = `tab_id_${ uuidGenerator() }`;
                    return tab;
                });
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
