/**
 * Mixin to store and sync the current input field value internally
 */
export default {
    data() {
        return {
            currentValue: this.value,
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                this.currentValue = newValue;
            },
        },
    },
};
