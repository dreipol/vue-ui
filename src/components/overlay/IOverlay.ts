interface IOverlayAutoClose {
    delay?: number;
    transition?: string;
}

export interface IOverlay {
    id: string;
    component: string | object;
    transition?: string;
    isOpen?: boolean;
    facets?: string[];
    disableScroll?: boolean;
    autoClose?: boolean | IOverlayAutoClose;
    props?: object;
}
