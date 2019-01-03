import { throttle } from 'lodash';
import { mapActions, mapState } from 'vuex';
import bemMixin from '../../mixins/bem';

const ROOT_CLASS = 'scroll-root';

export default {
    mixins: [
        bemMixin(ROOT_CLASS),
    ],
    data() {
        return {
            scrollLockPosition: null,
        };
    },
    computed: {
        ...mapState('vue-ui/scroll', ['position', 'scrollbarWidth', 'isLocked']),
    },
    methods: {
        ...mapActions('vue-ui/scroll', ['setScroll']),
        throttledSetScroll: throttle(() => this.setScroll(), 100),
    },
    mounted() {
        this.setScroll();
        document.documentElement.classList.add(ROOT_CLASS);
        window.addEventListener('scroll', this.throttledSetScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.throttledSetScroll);
    },
    watch: {
        $route: {
            handler() {
                // NOTE: Don't reset scroll position after route change
                this.scrollLockPosition = 0;
            },
        },
        isLocked: {
            handler(val) {
                const lockedClass = this.bemAdd('is-locked', null, ROOT_CLASS);

                document.documentElement.classList[val ? 'add' : 'remove'](lockedClass);
                document.body.style.top = val ? `${ this.position * -1 }px` : '';
                document.body.style.paddingRight = val ? `${ this.scrollbarWidth }px` : '';

                if (val) {
                    this.scrollLockPosition = this.position;
                } else {
                    // NOTE: Force a vuex update for all registered components
                    if (document.body.scrollTop === this.scrollLockPosition) {
                        window.scrollTo(null, this.scrollLockPosition + 1);
                        this.setScroll();
                    }

                    window.scrollTo(null, this.scrollLockPosition);
                    this.setScroll();
                }
            },
        },
    },
};
