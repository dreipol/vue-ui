<script>
    export default {
        functional: true,
        render(h, { children }) {
            if (!children.length) {
                return null;
            }

            return h('div', {
                class: 'form-field--actions',
            }, children.map(action => {
                return h('span', {
                    class: 'form-field--action',
                }, [action]);
            }));
        },
    };
</script>
