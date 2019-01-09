/**
 * Wraps the image url in a vue style object
 * @param {string} url - The url for the background-image
 * @return {object} An object that can be used within a vue template's `:style` attribute
 */
export default function backgroundImageFilter(url) {
    return { 'background-image': `url(${ url })` };
}
