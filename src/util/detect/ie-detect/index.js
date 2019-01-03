const { documentElement, documentMode } = window.document;
const detection = Object.seal({ isIE: null, version: null });

/**
 * Detect any Internet Explorer version
 * Important: The "cc_on" comment within this method must not be stripped by any means!
 * @return {object} An object containing a flag and the IE version (if applicable)
 */
function detect() {
    if (detection.isIE != null) {
        return detection;
    }

    const isIE11 = ('-ms-scroll-limit' in documentElement.style) && ('-ms-ime-align' in documentElement.style) && document.documentMode;
    let reportedJscriptVersion = (function() {
        /*@cc_on switch(@_jscript_version) {case 1.0: return 3; case 3.0: return 4; case 5.0: return 5; case 5.1: return 5; case 5.5: return 5.5; case 5.6: return 6; case 5.7: return 7; case 5.8: return 8; case 9: return 9; case 10: return 10;} @*/
        return null;
    }());

    detection.version = documentMode || (isIE11 ? 11 : reportedJscriptVersion);
    detection.isIE = detection.version != null;
    addDetectionClasses(detection.version);

    return detection;
};

/**
 * Adds IE detection classes to an element
 * @param {number} version - A number indicating the IE version
 */
function addDetectionClasses(version) {
    switch (version) {
        case (3):
        case (4):
        case (5):
        case (5.5):
        case (6):
        case (7):
            documentElement.className += ' lt-ie8 lt-edge';
            break;
        case (8):
            documentElement.className += ' ie8 lt-edge';
            break;
        case (9):
            documentElement.className += ' ie9 lt-edge';
            break;
        case (10):
            documentElement.className += ' ie10 lt-edge';
            break;
        case (11):
            documentElement.className += ' ie11 lt-edge';
            break;
        default:
            break;
    }
}


export const isIE = detect().isIE;
export const version = detect().version;
