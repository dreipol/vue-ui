<template>
    <div class="ui-tabs">
        <ul class="ui-tabs--list">
            <li class="ui-tabs--list-item" v-for="(tab, index) in tabs" :key="index">
                <a :class="tabClasses(tab)"
                        :href="tab.href"
                        class="ui-tabs--link"
                        tabindex="0"
                        :target="tab.target"
                        :rel="tab.rel"
                        v-if="tab.href !== ''"
                        ref="tabRefs"
                        @click.prevent="(e) => activateTab(e, tab)"
                        @keypress.enter="(e) => activateTab(e, tab)"
                        @transitionend="onTransitionEnd"
                        @transitionstart="onTransitionStart">
                    <render-label :label="tab.$slots['tab-label']" v-if="tab.$slots['tab-label']"/>
                </a>
                <div :class="tabClasses(tab)"
                        :href="tab.href"
                        class="ui-tabs--link"
                        tabindex="0"
                        v-else
                        ref="tabRefs"
                        @click.prevent="(e) => activateTab(e, tab)"
                        @keypress.enter="(e) => activateTab(e, tab)"
                        @transitionend="onTransitionEnd"
                        @transitionstart="onTransitionStart">
                    <render-label :label="tab.$slots['tab-label']" v-if="tab.$slots['tab-label']"/>
                </div>
            </li>
        </ul>
        <div class="ui-tabs--body" ref="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import { bemMixin } from '../../mixins';
    
    export default {
        components: {
            //If we want to render not just strings we need to render The label as a Vue Component
            RenderLabel: {
                functional: true,
                render: (h, ctx) => ctx.props.label,
            },
        },
        mixins: [
            bemMixin('ui-tabs'),
        ],
        props: {
            selectedTabId: {
                type: Number || null,
                default: null,
            },
            hasAnimation: {
                type: Boolean,
                default: true,
            },
            shouldAlwaysRenderContent: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                initTabs: [],
                tabs: [],
                state: {
                    // We need the corresponding tab from tabs to set the Body active
                    // We need the element to set to identify the active tab
                    isEntering: {
                        tab: null,
                        el: null,
                    },
                    isLeaving: {
                        tab: null,
                    },
                },
            };
        },
        computed: {
            setTabs() {
                if (this.tabs.length > 0) {
                    return this.tabs;
                }
                this.initTabs.forEach(tab => {
                    if (tab.tabId === this.selectedTabId && this.selectedTabId) {
                        tab.isActive = true;
                    }
                    tab.shouldAlwaysRender = this.shouldAlwaysRenderContent;
                    if (tab.hasAnimation === null) {
                        tab.setHasAnimation = this.hasAnimation;
                    }
                });
                
                this.setContentHeight();
                return this.initTabs;
            },
            getActiveItem() {
                return this.tabs.find(tab => tab.isActive);
            },
            calcHeight() {
                if (this.state.isEntering.tab === null) {
                    return 0;
                }
                return this.state.isEntering.tab.$el.offsetHeight;
            },
        },
        methods: {
            setContentHeight() {
                const { content } = this.$refs;
                
                if (!content) {
                    return;
                }
                
                this.$nextTick(() => {
                    content.style.height = `${ this.calcHeight }px`;
                });
            },
            activateTab(e, nextVisibleTab) {
                const currentlyVisibleTab = this.tabs.find(tab => tab.isActive);
                
                if (currentlyVisibleTab === nextVisibleTab) {
                    return;
                }
                
                nextVisibleTab.isActive = true;
                nextVisibleTab.isAnimating = true;
                
                if (currentlyVisibleTab) {
                    currentlyVisibleTab.isAnimating = true;
                    currentlyVisibleTab.isActive = false;
                }
                
                this.state.isEntering.tab = nextVisibleTab;
                this.state.isEntering.el = e.target;
                this.state.isLeaving.tab = currentlyVisibleTab;
                this.setContentHeight();
            },
            tabClasses(tab) {
                const isEntering = this.hasAnimation && this.state.isEntering.tab === tab && tab.isAnimating && tab.hasTransition;
                const isLeaving = this.hasAnimation && this.state.isLeaving.tab === tab && this.hasAnimation && tab.hasTransition;
                const isActive = tab.isActive && !isEntering;
                
                return [
                    this.bemAdd(isEntering && 'is-entering', 'link'),
                    this.bemAdd(isLeaving && 'is-leaving', 'link'),
                    this.bemAdd(isActive && 'is-active', 'link'),
                ];
            },
            onTransitionStart() {
                //Calculate height so we can set the bodies position to absolute
                const { content } = this.$refs;
                content.style.height = `${ this.contentHeight }px`;
            },
            onTransitionEnd(e) {
                const transitionTab = this.$refs.tabRefs.find(item => item === e.target);
                const isEntering = transitionTab === this.state.isEntering.el;
                if (isEntering) {
                    this.state.isEntering.tab.isAnimating = false;
                    return;
                }
                this.state.isLeaving.tab = null;
            },
        },
        mounted() {
            // Watch the tabs and find the active tab
            this.$watch('getActiveItem', () => {
                this.state.isEntering.tab = this.getActiveItem;
            });
            
            //If we want to set Tabs after mounting we need to watch the tabs and set the active tab correctly
            this.$watch('setTabs', () => {
                this.tabs = this.setTabs;
            });
            
            this.initTabs = this.$children;
        },
    };
</script>
