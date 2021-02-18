/** @type {IBemFacetOptions} */
export const DEFAULT_OPTIONS = Object.freeze({
    bemModifierMarker: '--',
    defaultFacet: 'base',
    bemElementMarker: '__',
});

/**
 * Return a props config object for a vue component based on the options given
 * @param {string} bemRoot - The block name
 * @param {boolean} useProp - A config flag
 * @return {object} The vue props config
 */
export function getPropsConfig(bemRoot, { useProp }) {
    if (!useProp) {
        return {};
    }

    return {
        facets: {
            type: Array,
            default() {
                return [];
            },
        },
    };
}

/**
 * Return a computed config object for a vue component based on the options given
 * @param {string} bemRoot - The block name
 * @return {object} The vue computed config
 */
export function getComputedConfig(bemRoot) {
    if (!bemRoot) {
        return {};
    }

    return {
        bemRoot() {
            return bemRoot;
        },
    };
}

/**
 * Compile a list of class strings from a list of facets
 * @param {string} blockName - Facet root class
 * @param {string[]} facets - The facets to be applied the component
 * @param {IBemFacetOptions} options - A config object
 * @return {string[]} An array of compiled facets
 */
export function mapFacets(blockName, facets, options = DEFAULT_OPTIONS) {
    const { defaultFacet, ...rest } = options;

    // Apply multiple facets by using an array
    const result = facets
        .filter(Boolean)
        .map(modifierName => createBemClass({ blockName, modifierName, ...rest }));

    // As `facet` can still be an empty string, we'll provide a base facet as a fallback
    if (!result.length) {
        return [createBemClass({ blockName, modifierName: defaultFacet, ...rest })];
    }

    return result;
}

/**
 * Create a valid CSS class out a config object of parts
 * @param {IBemClassParts} bemClassParts - All parts of a valid BEM class
 * @return {string} The resulting CSS class
 */
export function createBemClass(bemClassParts) {
    const { blockName, modifierName = '', elementName = '', bemModifierMarker, bemElementMarker } = bemClassParts;

    const elementPart = elementName ? `${ bemElementMarker }${ elementName }` : '';
    const modifierPart = modifierName ? `${ bemModifierMarker }${ modifierName }` : '';
    return `${ blockName }${ elementPart }${ modifierPart }`;
}



