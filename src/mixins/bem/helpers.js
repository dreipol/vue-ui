export const DEFAULT_OPTIONS = Object.freeze({
    bemModifierMarker: '__',
    defaultFacet: 'base',
    bemElementMarker: '--',
});

/**
 * Arraify facets in order to use single or multiple facets in a react component
 * @param {string} blockName - facet root class
 * @param {Array} facets - the facets we want to apply to the component
 * @param {object} options - see the DEFAULT_OPTIONS above
 * @return {Array} array of the facets to apply to the react node
 */
export function mapFacets(blockName, facets, options = DEFAULT_OPTIONS) {
    const { defaultFacet } = options;

    // Apply multiple facets by using an array
    const result = facets.map(modifierName => createBemClass({ blockName, modifierName, ...options })).filter(Boolean);

    // As `facet` can still be an empty string, we'll provide a base facet as a fallback
    if (!result.length) {
        return [createBemClass({ blockName, modifierName: defaultFacet, ...options })];
    }

    return result;
}

/**
 * Create a BEM css class out of the a root class and a modifier (AKA facet)
 * @param {string} blockName - root class name
 * @param {string} modifierName - facet or modifier property
 * @param {string} elementName - optional child bem selector
 * @param {object} options - see the DEFAULT_OPTIONS above
 * @return {string} a valid BEM class
 */
export function createBemClass({ blockName, modifierName, elementName, bemModifierMarker, bemElementMarker }) {
    const elementPart = elementName ? `${ bemElementMarker }${ elementName }` : '';
    const modifierPart = modifierName ? `${ bemModifierMarker }${ modifierName }` : '';
    return modifierPart ? `${ blockName }${ elementPart }${ modifierPart }` : '';
}



