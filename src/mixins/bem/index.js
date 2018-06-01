export const DEFAULT_OPTIONS = Object.freeze({
    defaultFacet: 'base',
    useProp: true,
    bemModifierMarker: '__',
    bemElementMarker: '--',
});


export default function bemMixin(bemRoot, config) {
    const { defaultFacet, useProp, bemModifierMarker, bemElementMarker } = Object.assign(
        {},
        DEFAULT_OPTIONS,
        config
    );

    return {
        props: (useProp ? {
            facet: {
                type: String,
            },
        } : {}),
        computed: {
            bemRoot() {
                return `${ bemRoot }`;
            },
            bemFacet() {
                // NOTE: As `facet` can still be an empty string, we'll provide a base facet as a fallback
                return this.bemAdd(this.facet || defaultFacet);
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
