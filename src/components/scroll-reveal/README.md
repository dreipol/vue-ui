# scroll-reveal
Reveals the component passed in the slot while scrolling upwards and hides it when scrolling down. Internally,
this is based on an implementation of [headroom.js](https://github.com/WickyNilliams/headroom.js). Additional params
can be given to the library by passing more attributes to the `scroll-reveal` component.
You need to set the `bemRoot` prop. This prop is the bem root class. `scroll-reveal` will add these modifiers:

- `&__pinned`
- `&__unpinned`
- `&__top`
- `&__not-top`
- `&__bottom`
- `&__not-bottom`

You need to provide styles for these modifiers.


## Example Usage

```html
    <ui-scroll-reveal element-class="reduced-nav">
        <main-header/>
    </ui-scroll-reveal>
```

### Example SCSS
```scss
    & {
        position: fixed;
        top: -80px;
        height: 80px;
        transition: top 200ms ease-in-out;
    }

    &.reduced-nav--top {
        display: none;
    }

    &.reduced-nav--not-top {
        display: block;
    }

    &.reduced-nav--pinned {
        top: 0;
        opacity: 1;
    }

    &.reduced-nav--unpinned {
        top: -80px;
        opacity: 0;
    }
```
