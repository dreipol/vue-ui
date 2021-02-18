# intersectionObserverMixin

[IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
Load via `import { interactionObserverMixin } from '@dreipol/vue-ui';` and add it to the `mixins`.

Now you can start observing an element:

```js
this.registerObserver(this.$el, 0.1)
```

This methods accepts 4 parameters

```js
/**
 * @param {Element} element - Dom element
 * @param {number} thresholdMin - minimal threshold trigger
 * @param {number} thresholdMax - maximal threshold trigger
 * @param {Object} config - Config options
 */
registerObserver(element, thresholdMin, (thresholdMax = null), (config = {}))
```

Now if the element enters or leaves the viewport you can implement 3 methods in your component.

`onIntersect(isIntersecting, entry)`, `onIntersectEnter(entry)` or `onIntersectLeave(entry)`.
Those are called automatically by the mixin.

To unregister simply call `unregister` with the given element.

Example:

```js
export default {
  mixins: [interactionObserverMixin],
  methods: {
    ...mapActions('navigation', ['setNavVisibility']),
    onIntersectEnter() {
      this.setNavVisibility({ isVisible: true })
    },
    onIntersectLeave() {
      this.setNavVisibility({ isVisible: false })
    },
  },
  beforeDestroy() {
    this.unregister(this.$refs.mainNavBar.$el)
  },
  mounted() {
    this.registerObserver(this.$el, 0.1)
  },
}
```
