# UiOverlay
Overlay system that handles multiple instances, transitions, scrolling behaviour and more.

## Usage

0. Add the component to the location where you want to insert one or multiple overlays.
You can also choose to add multiple instances of this component in different locations, each displaying only a subset.
 
```vue
<script>
    import { mapState } from 'vuex';
    import { UiOverlay } from '@dreipol/vue-ui';
    
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
import { uiOverlayVuexModule } from '@dreipol/vue-ui';

const store = new Vuex.Store({
    modules: {
        'vue-ui': {
            namespaced: true,
            modules: { overlay: uiOverlayVuexModule },
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


## Options

### IOverlay

| Name | Type | Default | Used in | Description
| --- | --- | --- | --- | --- 
| `id` | string | null | `openOverlay` `closeOverlay` | A unique string that identifies the overlay that is being opened / closed
| `component` | string | null | `openOverlay` | The name of the component that is being rendered
| `transition` | string | null | `openOverlay` `closeOverlay` | The transition name to be used when opening / closing the overlay
|  `disableScroll` | boolean | true | `openOverlay` | Decide whether the overlay should disable the browser scroll bar
| `autoClose` | boolean / IOverlayAutoClose | null | `openOverlay` `closeOverlay` | The overlay closes itself with the properties given in this option, see below for details 
| `facets` | string[] | ['base'] | `openOverlay` `closeOverlay` | A list of facet classes that is given to the overlay component for easier styling (see [bem mixin](/src/mixins/bem))
| `props` | any | {} | `openOverlay` | These properties will be given to the mounting component via `v-bind`

### IOverlayAutoClose

| Name | Type | Default | Used in | Description
| --- | --- | --- | --- | --- 
| `delay` | number |  | `openOverlay` | Define the delay after which the overlay shall be closed automatically 
| `transition` | string | null | `openOverlay` | Equivalent to the option in `IOverlay`


## Example Open Overlay
```vue
<template>
    <div>
        <button @click="onClick">
            log in
        </button>
        
        <!-- only one overlay -->
        <ui-overlay id="LOGIN_OVERLAY"/>
        
        <!-- add all overlays -->
        <ui-overlay v-for="(overlay, overlayId) in overlays" :id="overlayId" :key="overlayId"/>
    </div>
</template>

<script>
    export default {
        computed: {
            ...mapState('vue-ui/overlay', ['overlays']), // only necessary for adding all overlays
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

# Example Close Overlay
```vue
<template>
    <div class="navigation-overlay grid grid--base">
        <div class="grid__container">
            <button class="navigation-overlay__btn" @click="onClose">
                <ui-icon size="medium"
                        symbol="close"/>
            </button>
            <div class="grid__row">
                <div class="navigation-overlay__col grid__col">
                    <desktop-map class="navigation-overlay__map navigation-overlay__map--desktop"/>
                    <mobile-map class="navigation-overlay__map navigation-overlay__map--mobile"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { UiIcon } from '@dreipol/vue-ui/src/components';
    import { mapActions } from 'vuex';
    import DesktopMap from './desktop-map';
    import MobileMap from './mobile-map';

    export default {
        components: {
            UiIcon,
            DesktopMap,
            MobileMap,
        },
        methods: {
            ...mapActions('vue-ui/overlay', ['closeOverlay']),
            onClose() {
                this.closeOverlay({ id: 'menu' });
            },
        },
    };
</script>
```

# SCSS

```scss
.ui-overlay {
    // Vars

    // Support

    /// Handle the overlay's scrolling behaviour
    /// @param {boolean} $allow-native-scrolling - Use native scrolling on the component or leave it be as is
    ///
    @mixin ui-overlay--restrict-scrolling-to-element($allow-native-scrolling: true) {
        .ui-overlay__display {
            overflow: hidden;
        }

        @if ($allow-native-scrolling) {
            .ui-overlay__component {
                @include ios-native-scrolling;
            }
        }
    }

    /// Handle the overlay's interactivity
    /// @param {boolean} $allow-backdrop - Allow or disallow click events on the backdrop (prevents clickthrough)
    /// @param {boolean} $allow-backdrop-click-area - Allow or disallow click events on the backdrop click area (allows closing the overlay)
    ///
    @mixin ui-overlay--restrict-pointerevents-to-element($allow-backdrop: false, $allow-backdrop-click-area: false) {
        pointer-events: none;

        .ui-overlay__component {
            pointer-events: auto;
        }

        @if ($allow-backdrop) {
            .ui-overlay__backdrop {
                pointer-events: auto;
            }
        }

        @if ($allow-backdrop-click-area) {
            .ui-overlay__backdrop-click-area {
                pointer-events: auto;
            }
        }
    }

    /// Handle the overlay's z-index
    /// @param {string} $layer - Use a layer name to set a z-index
    /// @param {number} $z-index - Directly use a `z-index`
    ///
    @mixin ui-overlay--set-layer-hierarchy($layer: null, $z-index: 0) {
        .ui-overlay__root {
            z-index: if($layer, z-index($layer), $z-index);
        }
    }

    /// Remove the overlay's (visual) backdrop
    ///
    @mixin ui-overlay--hide-backdrop() {
        .ui-overlay__backdrop {
            display: none;
        }
    }

    /// Allow the overlay to be full height
    ///
    @mixin ui-overlay--full-height() {
        .ui-overlay__display,
        .ui-overlay__wrap-outer,
        .ui-overlay__wrap-inner,
        .ui-overlay__container {
            display: flex;
            flex-flow: row nowrap;
            align-items: stretch;
        }
    }

    /// Allow the overlay to be full width
    ///
    @mixin ui-overlay--full-width() {
        .ui-overlay__wrap-inner,
        .ui-overlay__container {
            flex: 0 1 100%;
            max-width: 100%;
        }
    }

    // Module
    & {
        .ui-overlay__root {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        .ui-overlay__backdrop {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba($c--monochrome-black, 0.2);
        }

        .ui-overlay__display {
            @include ios-native-scrolling;
            position: relative;
            width: 100%;
            height: 100%;
        }

        .ui-overlay__backdrop-click-area {
            @include overlay;
            z-index: 1;
        }

        .ui-overlay__wrap-outer {
            @include is-selectable(true);
            display: table;
            width: 100%;
            height: 100%;
            table-layout: fixed;
        }

        .ui-overlay__wrap-inner {
            position: relative;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        .ui-overlay__container {
            z-index: 2;
            position: relative;
            width: 100%;
        }
    }

    // Facets
    & {
        // Example Overlay
        &.ui-overlay--base {
            @include ui-overlay--hide-backdrop;
            @include ui-overlay--full-height;
            @include ui-overlay--full-width;
            @include ui-overlay--restrict-scrolling-to-element;
            @include ui-overlay--restrict-pointerevents-to-element($allow-backdrop-click-area: false);
            @include ui-overlay--set-layer-hierarchy($layer: 'example-overlay');
        }
    }

    // States
}
```

