let result;
const scrollStyles = {
    width: '100px',
    height: '100px',
    overflow: 'scroll',
    position: 'fixed',
    opacity: '0',
};

/**
 * Create an element and read it's scrollbar width
 * @link https://davidwalsh.name/detect-scrollbar-width
 * @return {number} The size of the scrollbar
 */
function readScrollbarWidth() {
    // Create the measurement node
    const scrollDiv = document.createElement('div');
    Object.assign(scrollDiv.style, scrollStyles);
    document.body.appendChild(scrollDiv);

    // Read values
    const { offsetWidth, clientWidth } = scrollDiv;

    // Delete helper element
    document.body.removeChild(scrollDiv);

    // Return width
    return (offsetWidth - clientWidth);
}

/**
 * Expose a method to return the browser's scrollbar width
 * @return {number} The browser's scrollbar width
 */
export default function scrollbarWidth() {
    if (result == null) {
        result = readScrollbarWidth();
    }

    return result;
}
