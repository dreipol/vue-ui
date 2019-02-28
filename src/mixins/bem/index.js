import { mapFacets, createBemClass, DEFAULT_OPTIONS } from './helpers';

const PROPS_CONFIG = {
    facets: {
        type: Array,
        default() {
            return [];
        },
    },
};

export default function bemMixin(bemRoot, config) {
    const options = {
        ...DEFAULT_OPTIONS,
        useProp: true,
        ...config,
    };

    return {
        props: options.useProp ? PROPS_CONFIG : {},
        computed: {
            bemRoot() {
                return bemRoot;
            },
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
