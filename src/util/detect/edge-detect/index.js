const EDGE_DETECT_RE = /Edge\/([0-9._]+)/;

/**
 * Detect any version of Microsoft Edge
 * @return {boolean} A flag indicating if the browser is Microsoft Edge
 */
function detect() {
    if (EDGE_DETECT_RE.test(window.navigator.userAgent)) {
        document.documentElement.className += ' edge';
        return true;
    }

    return false;
}


export const isEdge = detect();
