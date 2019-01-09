# scroll-reveal
Reveals the component passed in the slot while scrolling upwards and hides it when scrolling down.
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
    <scroll-reveal element-class="reduced-nav">
        <main-header/>
    </scroll-reveal>
```

### Example SCSS
```scss
    & {
        position: fixed;
        top: -80px;
        height: 80px;
        transition: top 200ms ease-in-out;
    }

    &.reduced-nav__top {
        display: none;
    }

    &.reduced-nav__not-top {
        display: block;
    }

    &.reduced-nav__pinned {
        top: 0;
        opacity: 1;
    }

    &.reduced-nav__unpinned {
        top: -80px;
        opacity: 0;
    }
```
