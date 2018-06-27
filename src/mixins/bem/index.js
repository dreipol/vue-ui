const PROPS_CONFIG = {
    facets: {
        type: Array,
        default() {
            return [];
        },
    },
};

export const DEFAULT_OPTIONS = Object.freeze({
    defaultFacet: 'base',
    useProp: true,
    bemModifierMarker: '__',
    bemElementMarker: '--',
});


export default function bemMixin(bemRoot, config) {
    const { defaultFacet, useProp, bemModifierMarker, bemElementMarker } = {
        ...DEFAULT_OPTIONS,
        ...config,
    };

    return {
        props: useProp ? PROPS_CONFIG : {},
        computed: {
            bemRoot() {
                return bemRoot;
            },
            bemFacets() {
                // Apply multiple facets by using an array
                const facets = this.facets.map(facet => this.bemAdd(facet)).filter(Boolean);

                // As `facet` can still be an empty string, we'll provide a base facet as a fallback
                if (!facets.length) {
                    facets.push(this.bemAdd(defaultFacet));
                }

                return facets;
            },
        },
        methods: {
            bemAdd(modifierName, elementName) {
                const elementPart = elementName ? `${ bemElementMarker }${ elementName }` : '';
                const modifierPart = modifierName ? `${ bemModifierMarker }${ modifierName }` : '';
                return modifierPart ? `${ this.bemRoot }${ elementPart }${ modifierPart }` : '';
            },
            bemIf(condition, trueModifier, falseModifier) {
                return this.bemAdd(condition ? trueModifier : falseModifier);
            },
        },
    };
};
