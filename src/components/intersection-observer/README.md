# UiIntersectionObserver

A simple implementation of the [`intersectionObserverMixin`](/src/mixins/intersection-observer).

## Usage

```js
import { UiIntersectionObserver } from '@dreipol/vue-ui'
```

## Props

| Name           | Type   | Default |
| -------------- | ------ | ------- |
| `thresholdMin` | number | 0.1     |
| `thresholdMax` | number | null    |

## Events

- `intersect(isIntersecting: boolean, entry: IntersectionObserverEntry )`
- `intersect-enter(entry: IntersectionObserverEntry )`
- `intersect-leave(entry: IntersectionObserverEntry )`

## Example

```vue
<ui-intersection-observer @intersect-enter="onIntersectEnter">
        <div>
            Loading
        </div>
    </ui-intersection-observer>
```
