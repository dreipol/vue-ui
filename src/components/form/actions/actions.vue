<script>
    export default {
        functional: true,
        render(h, { children }) {
            if (!Array.isArray(children) || !children.length) {
                return null;
            }

            const wrappedChildren = children.map(action => {
                return h('span', { class: 'form-field--action' }, [action]);
            });

            return h('div', { class: 'form-field--actions' }, wrappedChildren);
        },
    };
</script>
