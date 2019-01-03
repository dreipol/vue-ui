/**
 * Mixin to store make the input checked property reactive
 */
export default {
    data() {
        return {
            isChecked: this.$attrs.checked,
        };
    },
    methods: {
        onChange(event) {
            this.isChecked = event.currentTarget.checked || this.value === true;
        },
    },
};
