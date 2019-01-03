# scroll-reveal
Reveals the component passed by the slot while scrolling upwards and hides it when scrolling down.
You have to set the `bemRoot` prop. This prop is bem root class. `scroll-reveal` will add interfaces such as
- `&__pinned`
- `&__unpinned`
- `&__top`
- `&__not-top`
- `&__bottom`
- `&__not-bottom`

You have to style them on your own!

Example Usage

```html
    <scroll-reveal element-class="reduced-nav">
        <main-header />
    </scroll-reveal>
```


Example SCSS

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
