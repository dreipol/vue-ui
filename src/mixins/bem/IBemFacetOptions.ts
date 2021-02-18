/**
 * BEM separators
 */
interface IBemMarkers {
  bemElementMarker: string
  bemModifierMarker: string
}

/**
 * BEM class parts including separators and names
 */
export interface IBemClassParts extends IBemMarkers {
  blockName: string
  elementName?: string
  modifierName?: string
}

/**
 * Facet utils options
 */
export interface IBemFacetOptions extends IBemMarkers {
  defaultFacet: string
}

/**
 * BEM mixin options
 */
export interface IBemMixinOptions extends IBemFacetOptions {
  useProp?: boolean
}
