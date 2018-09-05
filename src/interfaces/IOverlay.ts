export interface IOverlay {
    id: string;
    transition?: string;
    isOpen?: boolean;
    facets?: string[];
    disableScroll?: boolean;
    autoClose?: object;
    component?: string;
    props?: object;
}
