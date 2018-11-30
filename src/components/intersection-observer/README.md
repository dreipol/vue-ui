# IntersectionObserverComponent
A simple implementation of the [`intersectionObserverMixin`](/src/mixins/intersection-observer). It's a simple component that will emit events

__Usage__
```js
    import { IntersectionObserverComponent } from '@dreipol/vue-ui';
```

__Props__

| Name | Type | Default |
| --- | --- | ---|
|`thresholdMin` |Number| 0.1 |
|`thresholdMax` |Number| null|

__Events__
-  `intersect(isIntersecting: boolean, entry: IntersectionObserverEntry )`
-  `intersect-enter(entry: IntersectionObserverEntry )`
-  `intersect-leave(entry: IntersectionObserverEntry )`

__Example__
```vue
    <intersection-observer @intersect-enter="onIntersectEnter">
        <div>
            Loading
        </div>
    </intersection-observer>
```

