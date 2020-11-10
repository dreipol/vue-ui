# UiTabs
Tabs component that could be used in a SPA or even as simple enhancement for your DOM components

## Usage
```js
import { UiTabs } from '@dreipol/vue-ui';
import { UiTab } from '@dreipol/vue-ui';
```

## Tabs Props
| Name | Type | Default | Description
| --- | --- | ---| ---|
|`selectedTab` | Number or null | null | Initially sets tab active
|`hasAnimation` | boolean | false | Does tabs have transitions or not
|`renderContentAlways` | boolean | false | Should visible and invisible content be always rendered to the dom

## Tab Props
| Name | Type | Default | Description
| --- | --- | ---| ---|
|`tabId` | Number or null | null | If set, it will match with selectedTab from Tabs and initially set the tab active
|`hasAnimation` | boolean | null | Does the tab have transitions or not
|`href` | string | empty | Will Render a Link if `href` is not empty otherwise it will render a div. If set, selecting the tab will redirect to the value of href. Any contents associated with this tab will never get rendered.
|`target` | string | empty | Will render if `href` is not empty
|`rel` | string | empty | Will Render if `href` is not empty



## Tabs Methods
-  `activateTab(e: Eventlistener, show: Array Item)` Method called on clicking at item
-  `setContentHeight()` Calculates the tab content height 
-  `tabClasses(tab: Array Item)` Sets classes to array Item
-  `onTransitionStart` callback on transition start
-  `onTransitionEnd(e: Eventlistener )` callback on transition end


## Tab Methods
-  `onTransitionEnd(e: Eventlistener )` callback on transition end

## Example
```vue
<!-- basic usage -->
<ui-tabs>
    <ui-tab>
    <template slot="tab-label">
        <h1 v-slot:head>
            Click Me
        </h1>
    </template>
    <template slot="tab-body">
        <p>
            Accordion body
        </p>
    </template>
    </ui-tab>
</ui-tabs>
```

# SCSS

```scss
.ui-tabs {
    // Vars

    // Support

    // Module
    & {
        .ui-tabs--list {
            display: flex;
        }
        .ui-tabs--list-item {
            padding: 20px;
        }
        .ui-tabs--link {
            cursor: pointer;
        
            &.ui-tabs--link__is-active {
                opacity: 1;
            }
            &.ui-tabs--link__is-entering {
                transition: opacity 300ms ease;
            }
            &.ui-tabs--link__is-leaving {
                transition: opacity 300ms ease;
            }
        }
        .ui-tabs--body {
            overflow: hidden;
            height: 0;
            opacity: 0;
            transition: height 300ms ease;
        }
        .ui-tabs--content-wrapper {

            &.ui-tabs--content-wrapper__is-entering {
                transition: opacity 300ms ease;
            }
            &.ui-tabs--content-wrapper__is-closing {
                transition: opacity 300ms ease;
            }
        }


    }

    // Facets
    & {
       
    }

    // States
}

```

