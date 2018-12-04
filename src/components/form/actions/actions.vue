<script>
    export default {
        functional: true,
        render(h, { children }) {
            if (!children.length) {
                return null;
            }

            return h('div', {
                class: 'form-field--actions',
                // skip plain dom nodes without a wrapper tag
            }, children.filter(action => action.tag).map(action => {
                return h('span', {
                    class: 'form-field--action',
                }, [action]);
            }));
        },
    };
</script>
