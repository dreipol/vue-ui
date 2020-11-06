<template>
    <div class="ui-tabs">
        <ul class="ui-tabs--list">
            <li class="ui-tabs--list-item" v-for="(tab, index) in tabs" :key="index">
                <a :class="tabClasses(tab)"
                        :href="tab.href"
                        class="ui-tabs--link"
                        tabindex="0"
                        ref="tabRefs"
                        @click.prevent="(e) => activateTab(e, tab)"
                        @keypress.enter="(e) => activateTab(e, tab)"
                        @transitionend="onTransitionEnd"
                        @transitionstart="onTransitionStart">
                    <render-label :label="tab.$slots['tab-label']" v-if="tab.$slots['tab-label']"/>
                </a>
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
            RenderLabel: {
                functional: true,
                render: (h, ctx) => ctx.props.label,
            },
        },
        mixins: [
            bemMixin('ui-tabs'),
        ],
        props: {
            selectedTab: {
                type: Number || null,
                default: null,
            },
            hasAnimation: {
                type: Boolean,
                default: true,
            },
            renderContentAlways: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                initTabs: [],
                tabs: [],
                state: {
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
                    if (tab.tabId === this.selectedTab && this.selectedTab) {
                        tab.isActive = true;
                    }
                    tab.renderAlways = this.renderContentAlways;
                    tab.setHasAnimation = this.hasAnimation;
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
            activateTab(e, show) {
                const hide = this.tabs.find(tab => tab.isActive);
                
                if (hide === show) {
                    return;
                }
                
                
                show.isActive = true;
                show.isAnimating = true;
                
                if (hide) {
                    hide.isAnimating = true;
                    hide.isActive = false;
                }
                
                this.state.isEntering.tab = show;
                this.state.isEntering.el = e.target;
                this.state.isLeaving.tab = hide;
                this.setContentHeight();
            },
            tabClasses(tab) {
                const isEntering = this.hasAnimation && this.state.isEntering.tab === tab && tab.isAnimating;
                const isLeaving = this.hasAnimation && this.state.isLeaving.tab === tab;
                const isActive = tab.isActive;
                
                return [
                    this.bemAdd(isEntering && 'is-entering', 'link'),
                    this.bemAdd(isLeaving && 'is-leaving', 'link'),
                    this.bemAdd(isActive && 'is-active', 'link'),
                ];
            },
            onTransitionStart() {
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
            this.$watch('getActiveItem', () => {
                this.state.isEntering.tab = this.getActiveItem;
            });
            
            this.$watch('setTabs', () => {
                this.tabs = this.setTabs;
            });
            
            this.initTabs = this.$children;
        },
    };
</script>
