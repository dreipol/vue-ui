/**
 * Detect any version of iOS Safari
 * @return {boolean} A flag indicating if the device runs iOS
 */
function detect() {
    const devices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
    ];

    const re = new RegExp(`${ devices.join('|') }`);

    if (re.test(navigator.userAgent) && !window.MSStream) {
        document.documentElement.className += ' ios';
        return true;
    }

    return false;
}


export const isIos = detect();
