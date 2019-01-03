import { mapGetters, mapState } from 'vuex';
import { isIos } from '../../util/detect/ios-detect';
import { defer } from '../../util/defer';

const SCROLL_LOCK_IOS_FIX_CLASS = 'u-scroll-lock-ios-fix';

export default {
    data() {
        return {
            scrollLockHelperStyleProp: 'paddingRight',
        };
    },
    computed: {
        ...mapGetters('vue-ui/scroll', ['hasScrollLockingOverlays']),
        ...mapState('vue-ui/scroll', ['scrollbarWidth']),
        scrollLockStyles() {
            return {
                [this.scrollLockHelperStyleProp]: (this.hasScrollLockingOverlays ? `${ this.scrollbarWidth }px` : ''),
            };
        },
        scrollLockIosFixClasses() {
            return [SCROLL_LOCK_IOS_FIX_CLASS];
        },
    },
    methods: {
        scrollLockIosFixForceUpdate($element) {
            // NOTE: The property that is being updated must change the position somehow to force an update
            const top = parseFloat(window.getComputedStyle($element).marginTop) || 0;
            $element.style.marginTop = `${ top - 0.5 }px`;

            defer(() => {
                this.$nextTick(() => {
                    $element.style.marginTop = null;
                });
            });
        },
    },
    watch: {
        isLocked: {
            handler() {
                // NOTE: After a scroll-lock, fixed elements must be forced to the right position on iOS
                if (!isIos || !this.$el) {
                    return;
                }

                Array.from(this.$el.querySelectorAll(`.${ SCROLL_LOCK_IOS_FIX_CLASS }`))
                    .forEach(this.scrollLockIosFixForceUpdate);
            },
        },
    },
};
