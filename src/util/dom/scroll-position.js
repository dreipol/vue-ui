/**
 * Return the vertical scroll position value in its many browser implementations
 * @return {number} The current vertical scroll position
 */
export function scrollTop() {
    if (document.scrollingElement) {
        return document.scrollingElement.scrollTop;
    }

    return window.scrollY || window.pageYOffset || 0;
}

/**
 * Return the horizontal scroll position value in its many browser implementations
 * @return {number} The current vertical scroll position
 */
export function scrollLeft() {
    if (document.scrollingElement) {
        return document.scrollingElement.scrollLeft;
    }

    return window.scrollX || window.pageXOffset || 0;
}
