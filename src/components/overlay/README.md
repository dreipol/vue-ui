# UiOverlay
Overlay system that handles multiple instances, transitions, scrolling behaviour and more.

## Usage

0. Add the component to the location where you want to insert one or multiple overlays.
You can also choose to add multiple instances of this component in different locations, each displaying only a subset.
 
```vue
<script>
    import { mapState } from 'vuex';
    import { UiOverlay } from '@dreipol/vue-ui/src/components';
    
    export default {
        components: {
            UiOverlay,
        },
        computed: {
            ...mapState('vue-ui/overlay', ['overlays']),
        },
    };
</script>

<template>
    <div>
        <ui-overlay v-for="(value, key) in overlays" :id="key" :key="key"/>
    </div>
</template>
```

0. Add the vuex overlay module to your own store.

```js
import Vuex from 'vuex';
import overlay from '@dreipol/vue-ui/src/vuex/modules/overlay';

const store = new Vuex.Store({
    modules: {
        'vue-ui': {
            namespaced: true,
            modules: { overlay },
        },
    },
});
```

0. Use the overlay vuex module's actions to open and close your overlays. 
You can use them in your components or even in other vuex actions.

```vue
<template>
    <button @click="onClick">
        click me to open the overlay                
    </button>
</template>

<script>
    export default {
        methods: {
            ...mapActions('vue-ui/overlay', ['openOverlay', 'closeOverlay']),
            onClick() {
                this.openOverlay({
                    id: 'MY_OVERLAY_ID',
                    component: 'my-overlay-content-comopnent',
                });
            },
        },
    };
</script>
```


## Props

### IOverlay

| Name | Type | Default | Used in | Description
| --- | --- | --- | --- | --- 
| `id` | string | null | `openOverlay` `closeOverlay` | A unique string that identifies the overlay that is being opened / closed
| `component` | string | null | `openOverlay` | The name of the component that is being rendered
| `transition` | string | null | `openOverlay` `closeOverlay` | The transition name to be used when opening / closing the overlay
|  `disableScroll` | boolean | true | `openOverlay` | Decide whether the overlay should disable the browser scroll bar
| `autoClose` | boolean / IOverlayAutoClose | null | `openOverlay` `closeOverlay` | The overlay closes itself with the properties given in this option, see below for details 
| `facets` | string[] | ['base'] | `openOverlay` `closeOverlay` | A list of facet classes that is given to the overlay component for easier styling  
| `props` | any | {} | `openOverlay` | These properties will be given to the mounting component via `v-bind`

### IOverlayAutoClose

| Name | Type | Default | Used in | Description
| --- | --- | --- | --- | --- 
| `delay` | number |  | `openOverlay` | Define the delay after which the overlay shall be closed automatically 
| `transition` | string | null | `openOverlay` | Equivalent to the option in `IOverlay`


## Example
```vue
<template>
    <div>
        <button @click="onClick">
            log in
        </button>
        
        <ui-overlay id="LOGIN_OVERLAY"/>
    </div>
</template>

<script>
    export default {
        computed: {
            ...mapState('vue-ui/overlay', ['overlays']),
        },
        methods: {
            ...mapActions('vue-ui/overlay', ['openOverlay', 'closeOverlay']),
            onClick() {
                this.openOverlay({
                    id: 'LOGIN_OVERLAY',
                    component: 'my-login-component' // Must be globally registered
                });
            },
        },
    };
</script>
```

# SCSS

```scss
.ui-accordion {
    // Vars

    // Support

    // Module
    & {
        .ui-accordion--head {
            cursor: pointer;
        }


        .ui-accordion--body {
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: opacity 300ms ease;
        }
    }

    // Facets
    & {
        &.ui-accordion__is-open {
            .ui-accordion--body {
                opacity: 1;
            }
        }

        &.ui-accordion__is-animating {
            .ui-accordion--body {
                transition: opacity 300ms ease, max-height 300ms ease;
            }
        }
    }

    // States
}

```

