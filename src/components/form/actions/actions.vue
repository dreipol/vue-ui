<script>
    export default {
        functional: true,
        render(h, { children }) {
            if (!Array.isArray(children)) {
                return null;
            }

            // Skip plain dom nodes without a wrapper tag
            const wrappedChildren = children.filter(({ tag }) => tag).map(action => {
                return h('span', { class: 'form-field--action' }, [action]);
            });

            return h('div', { class: 'form-field--actions' }, wrappedChildren);
        },
    };
</script>
