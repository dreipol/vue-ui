export const hasOpenOverlays = state => {
    return !!Object.values(state.overlays).find(overlay => overlay.isOpen);
};

export const hasScrollLockingOverlays = state => {
    return !!Object.values(state.overlays).find(overlay => overlay.lockScroll);
};
