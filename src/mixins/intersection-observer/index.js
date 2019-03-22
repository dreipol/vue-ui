export default {
    data() {
        return {
            /** @type {IntersectionObserver} */
            observer: null,

            /** @type {IRegistrationOptions | null} */
            observerOptions: null,
        };
    },

    methods: {
        /**
         * Handles any intersection callback
         *
         * @param {boolean} isIntersecting - intersection identifier
         * @param {IntersectionObserverEntry} entry - Intersection element
         */
        // eslint-disable-next-line no-unused-vars
        onIntersect(isIntersecting, entry) {
        },

        /**
         * Handle when element enters viewport
         * @param {IntersectionObserverEntry} entry - intersection entry
         */
        // eslint-disable-next-line no-unused-vars
        onIntersectEnter(entry) {
        },

        /**
         * Handle when element leaves viewport
         * @param {IntersectionObserverEntry} entry - intersection entry
         */
        // eslint-disable-next-line no-unused-vars
        onIntersectLeave(entry) {
        },

        /**
         * Register observer
         * @param {Element} element - Dom element
         * @param {number} thresholdMin - minimal threshold trigger
         * @param {number|null} thresholdMax - maximal threshold trigger
         * @param {IRegistrationOptions} config - Config options
         */
        registerObserver(element, thresholdMin, thresholdMax = null, config = { rootMargin: '0px 0px 0px 0px' }) {
            this.observerOptions = config;

            if (typeof thresholdMax === 'object') {
                config = thresholdMax;
                thresholdMax = null;
            }

            if (thresholdMin !== null && thresholdMax !== null) {
                this.observerOptions.threshold = [thresholdMin, thresholdMax];
            } else {
                this.observerOptions.threshold = thresholdMin;
            }

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    this.handleIntersection(entry);
                });
            }, this.observerOptions);

            this.observer.observe(element);
        },

        /**
         * Handle intersection
         * @param {IntersectionObserverEntry} entry - intersection entry object
         */
        handleIntersection(entry) {
            const ratio = entry.intersectionRatio;
            const { threshold } = this.observerOptions;

            let isInThreshold = false;
            if (Array.isArray(threshold)) {
                isInThreshold = ratio > threshold[0] && ratio <= threshold[1];
            } else {
                isInThreshold = ratio > threshold;
            }

            this.onIntersect(isInThreshold, entry);

            if (isInThreshold) {
                this.onIntersectEnter(entry);
            } else {
                this.onIntersectLeave(entry);
            }
        },

        /**
         * Unregister intersection observer
         * @param {Element} element - element to remove from observer
         */
        unregister(element) {
            this.observer.unobserve(element);
        },
    },
};
