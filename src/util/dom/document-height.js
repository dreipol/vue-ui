const body = document.body;
const html = document.documentElement;

/**
 * Get the height of the whole page
 * @link https://javascript.info/size-and-scroll-window
 * @return {number} Height in px of the document
 */
export default function documentHeight() {
    let result;

    if (document.height) {
        result = document.height;
    } else {
        result = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
    }

    return result;
};
