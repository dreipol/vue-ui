# IntersectionObserverComponent
A simple implementation of the [`intersectionObserverMixin`](/src/mixins/intersection-observer).

## Usage
```js
    import { IntersectionObserverComponent } from '@dreipol/vue-ui';
```

## Props
| Name | Type | Default |
| --- | --- | ---|
|`thresholdMin` |Number| 0.1 |
|`thresholdMax` |Number| null|

## Events
-  `intersect(isIntersecting: boolean, entry: IntersectionObserverEntry )`
-  `intersect-enter(entry: IntersectionObserverEntry )`
-  `intersect-leave(entry: IntersectionObserverEntry )`

## Example
```vue
    <intersection-observer @intersect-enter="onIntersectEnter">
        <div>
            Loading
        </div>
    </intersection-observer>
```

