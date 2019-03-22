<script>
    import { createBemClass, DEFAULT_OPTIONS } from '../../../mixins/bem/helpers';

    const ROOT_CLASS = 'ui-form-field';
    const wrappedChildClass = createBemClass({ // eslint-disable-line no-unused-vars
        blockName: ROOT_CLASS,
        modifierName: '',
        elementName: 'action',
        ...DEFAULT_OPTIONS,
    });
    const componentClass = createBemClass({ // eslint-disable-line no-unused-vars
        blockName: ROOT_CLASS,
        modifierName: '',
        elementName: 'actions',
        ...DEFAULT_OPTIONS,
    });

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
