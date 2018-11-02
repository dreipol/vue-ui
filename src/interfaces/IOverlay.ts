export interface IOverlay {
    id: string;
    component: string|object;
    transition?: string;
    isOpen?: boolean;
    facets?: string[];
    disableScroll?: boolean;
    autoClose?: object;
    props?: object;
}
