<script>
    import { debounce } from 'lodash';
    import { mapActions } from 'vuex';
    import { getViewportData } from 'util/dom/mq';
    import { hidden, visibilitychange } from 'util/dom/visibility-change';

    export default {
        methods: {
            ...mapActions('viewport', ['setViewport', 'setPageVisibility']),
            updateViewport: debounce(function() {
                const mq = getViewportData();

                if (!mq.width || !mq.query) {
                    this.updateViewport();
                } else {
                    const { innerWidth: width, innerHeight: height } = window;
                    this.setViewport({ width, height, mq });
                }
            }, 100, {
                maxWait: 1000,
            }),
            onVisibilityChange() {
                this.setPageVisibility({
                    hidden: document[hidden],
                });
            },
        },
        mounted() {
            this.updateViewport();
            window.addEventListener('resize', this.updateViewport);
            window.addEventListener('orientationchange', this.updateViewport);
            document.addEventListener(visibilitychange, this.onVisibilityChange, false);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.updateViewport);
            window.removeEventListener('orientationchange', this.updateViewport);
            document.removeEventListener(visibilitychange, this.onVisibilityChange);
        },
    };
</script>
