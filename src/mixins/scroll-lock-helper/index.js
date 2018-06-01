import { mapState } from 'vuex';
import { isIos } from 'util/detect/ios-detect';


const SCROLL_LOCK_IOS_FIX_CLASS = 'u-scroll-lock-ios-fix';


export default {
    data() {
        return {
            scrollLockHelperStyleProp: 'paddingRight',
        };
    },
    computed: {
        ...mapState('scroll', ['scrollbarWidth', 'isLocked']),
        scrollLockStyles() {
            return {
                [this.scrollLockHelperStyleProp]: (this.isLocked ? `${ this.scrollbarWidth }px` : ''),
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

            setTimeout(() => {
                this.$nextTick(() => {
                    $element.style.marginTop = null;
                });
            }, 0);
        },
    },
    watch: {
        isLocked: {
            handler() {
                // NOTE: After a scroll-lock, fixed elements must be forced to the right position on iOS
                if (!isIos) {
                    return;
                }

                Array.from(this.$el.querySelectorAll(`.${ SCROLL_LOCK_IOS_FIX_CLASS }`))
                    .forEach(this.scrollLockIosFixForceUpdate);
            },
        },
    },
};
