<script>
    export default {
        props: {
            isLazy: {
                type: Boolean,
                default: false,
            },
            tabs: {
                type: Array,
                required: true,
            },
            activeId: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                panelListHeight: 0,
            };
        },
        computed: {
            wrapperStyles() {
                return { height: this.panelListHeight ? `${ this.panelListHeight }px` : null };
            },
        },
        methods: {
            calcCurrentPanelHeight() {
                const activeIndex = this.isLazy ? 0 : this.activeId;
                const activePanel = this.$refs.panelList ? this.$refs.panelList[activeIndex] : null;
                
                this.panelListHeight = activePanel ? activePanel.offsetHeight : 0;
            },
            renderPanelGroup() {
                return (
                    <transition-group
                        mode="out-in"
                        onEnter={this.calcCurrentPanelHeight}
                        tag="div"
                        name="ui-tabs--panel"
                        class="ui-tabs--panel-wrapper"
                        style={this.wrapperStyles}>
                        {
                            this.tabs.map((item, index) => {
                                return (
                                    <div
                                        role="tabpanel"
                                        aria-labelledby={item.uuid}
                                        key={ index }
                                        className="ui-tabs--panel"
                                        v-show={ index === this.activeId }
                                        ref="panelList"
                                        refInFor={ true }>
                                        {item.children}
                                    </div>
                                );
                            })
                        }
                    </transition-group>
                );
            },
            renderSinglePanel() {
                console.log(this.tabs[this.activeId]);
                return (
                    <transition-group
                        onEnter={ this.calcCurrentPanelHeight }
                        tag="div"
                        name="ui-tabs--panel"
                        class="ui-tabs--panel-wrapper"
                        style={ this.wrapperStyles }>
                        <div
                            role="tabpanel"
                            aria-labelledby={this.tabs[this.activeId].uuid}
                            key={this.activeId}
                            ref="panelList"
                            className="ui-tabs--panel"
                            refInFor={ true }>
                            { this.tabs[this.activeId].children }
                        </div>
                    </transition-group>
                );
            },
        },
        mounted() {
            //We need to calculate height, because otherwise we can not animate it.
            this.calcCurrentPanelHeight();
        },
        render() {
            return this.isLazy ? this.renderSinglePanel() : this.renderPanelGroup();
        },
    };
</script>
