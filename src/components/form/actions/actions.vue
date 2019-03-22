<script>
    import { createBemClass, DEFAULT_OPTIONS } from '../../../mixins/bem/helpers';

    const CLASS_CONFIG = { blockName: 'ui-form-field', modifierName: '', ...DEFAULT_OPTIONS };
    const wrappedChildClass = createBemClass({ elementName: 'action', ...CLASS_CONFIG });
    const componentClass = createBemClass({ elementName: 'actions', ...CLASS_CONFIG });

    export default {
        functional: true,
        render(h, { children }) {
            if (!Array.isArray(children) || !children.length) {
                return null;
            }

            const wrappedChildren = children.map(action => {
                return h('span', { class: wrappedChildClass }, [action]);
            });

            return h('div', { class: componentClass }, wrappedChildren);
        },
    };
</script>
