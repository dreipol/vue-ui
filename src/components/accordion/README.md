# UiAccordion
Accordion component that could be used in a SPA or even as simple enhancement for your DOM components

## Usage
```js
import { UiAccordion } from '@dreipol/vue-ui';
```

## Props
| Name | Type | Default | Description
| --- | --- | ---| ---|
|`isOpen` | boolean | false | It will work only when also the `isPassive` property is enabled. It triggers the accordion animation
|`isPassive` | boolean | false | It allows you to control the accordion from the outside

## Events
-  `change(isOpen: boolean)` callback called when the accordion starts the animation
-  `changed(isOpen: boolean)` callback called when the accordion has finished the animation
-  `request-change(isOpen: boolean)` the request change will be triggered before the accordion will change its internal state and only if has the `isPassive` mode set to false

## Example
```vue
<!-- basic usage -->
<ui-accordion>
    <h1 v-slot:head>
        Click Me
    </h1>
    <p v-slot:body>
        Accordion body
    </p>
</ui-accordion>

<!-- using forwarded props -->
<ui-accordion>
    <h1 v-slot:head>
        Click Me
    </h1>
    <div v-slot:body slot-scope="props">
        <google-maps v-if="props.isVisible"></google-maps>
    </div>
</ui-accordion>
```

# SCSS

```scss
.ui-accordion {
    // Vars

    // Support

    // Module
    & {
        .ui-accordion__head {
            cursor: pointer;
        }


        .ui-accordion__body {
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: opacity 300ms ease;
        }
    }

    // Facets
    & {
        &.ui-accordion--is-open {
            .ui-accordion__body {
                opacity: 1;
            }
        }

        &.ui-accordion__is-animating {
            .ui-accordion__body {
                transition: opacity 300ms ease, max-height 300ms ease;
            }
        }
    }

    // States
}

```

