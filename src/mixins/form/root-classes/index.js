export default {
    computed: {
        rootClasses() {
            const classes = [
                ...this.bemFacets,
                this.bemIf(this.hasFloatingLabel, 'floating-label'),
                this.bemIf(this.hasErrors, 'has-error'),
                this.bemIf(this.$attrs.required, 'is-required', 'is-optional'),
                this.bemIf(this.$attrs.disabled, 'is-disabled'),
                this.bemIf(this.hasFocus, 'has-focus'),
                this.bemIf(this.$slots && this.$slots.actions, 'has-actions'),
                this.bemIf(this.currentValue, 'is-filled', 'is-empty'),
            ];

            // NOTE: Extend the form clesses adding also the floating variants
            if (this.hasFloatingLabel) {
                const isFloating = this.$attrs.placeholder || this.currentValue || this.hasFocus || this.$attrs.disabled;
                classes.push(this.bemIf(isFloating, 'is-floating'));
            }

            return classes;
        },
    },
};


