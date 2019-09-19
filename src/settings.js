export const SELECT_ICON = 'DREIPOL_VUE_UI__SELECT_ICON';
export const CHECKBOX_ICON = 'DREIPOL_VUE_UI__CHECKBOX_ICON';
export const USE_ICON_TITLES = 'USE_ICON_TITLES';
export const settings = new Map();

// icons settings
settings.set(SELECT_ICON, {
    symbol: 'select-icon',
    size: 'medium',
});

settings.set(CHECKBOX_ICON, {
    symbol: 'checkmark',
    size: 'small',
});

// misc settings
settings.set(USE_ICON_TITLES, true);

export default settings;
