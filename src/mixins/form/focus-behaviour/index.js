/**
 * Here we can manage the input field hasFocus property
 */
export default {
    props: {
        focus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hasFocus: this.focus,
        };
    },
    methods: {
        onFocus() {
            this.hasFocus = true;
        },
        onBlur() {
            this.hasFocus = false;
        },
    },
};
