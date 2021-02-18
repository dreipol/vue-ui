export default {
    data() {
        return {
            isMounted: false,
            isDestroyed: false,
        };
    },
    updated() {
        if (this.isMounted && !this.isDestroyed && !this.$children.length) {
            this.beforeDestroy();
        }
    },
    beforeCreate() {
        this.$emit('before-enter');
    },
    beforeMount() {
        this.$emit('enter');
        this.isMounted = true;
    },
    mounted() {
        this.$emit('after-enter');
    },
    methods: {
        beforeDestroy() {
            this.$emit('before-leave');
            this.destroyed();
        },
        destroyed() {
            this.$emit('leave');
            this.isDestroyed = true;
            this.afterDestroy();
        },
        afterDestroy() {
            this.$emit('after-leave');
        },
    },
    render: function() {
        return this.$options._renderChildren;
    },
};
