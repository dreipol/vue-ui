import { getComputedConfig, getPropsConfig, mapFacets, createBemClass, DEFAULT_OPTIONS } from './helpers';
export default function bemMixin(bemRoot, config) {
    const options = {
        ...DEFAULT_OPTIONS,
        useProp: true,
        ...config,
    };

    return {
        props: {
            ...getPropsConfig(bemRoot, options),
        },
        computed: {
            ...getComputedConfig(bemRoot, options),
            bemFacets() {
                return mapFacets(this.bemRoot, this.facets, options);
            },
        },
        methods: {
            bemAdd(modifierName, elementName, rootName) {
                const blockName = rootName || this.bemRoot;
                return createBemClass({ blockName, modifierName, elementName, ...options });
            },
            bemIf(condition, trueModifier, falseModifier) {
                return this.bemAdd(condition ? trueModifier : falseModifier);
            },
        },
    };
};
