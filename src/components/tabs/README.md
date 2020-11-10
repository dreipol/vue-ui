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


##Template Slots
| Name | Description
| --- | --- |
|tab-label | Will render the Tab 
|tab-body | Will render the Tab Body Content


## Example
```vue
<!-- basic usage -->
<ui-tabs>
    <ui-tab>
    <template slot="tab-label">
        <h1>
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

# Classes
| Element | Name | Description
| --- | --- | --- |
Wrapper | ui-tabs |
Tabs Wrapper `ul` |ui-tabs--list | the tab wrapper class 
Tabs Item `li` |ui-tabs--list-item | the tab item class
Tabs Item Link `a` or `div` |ui-tabs--link | the tab class
| |ui-tabs--link__is-active | the active tab class
| |ui-tabs--link__is-entering | the animation tab class to become active
| |ui-tabs--link__is-leaving | the animation tab class to become inactive
Tab Content Wrapper | ui-tabs--content-wrapper | the content wrapper
| | ui-tabs--content-wrapper__is-opening | the animation content wrapper class to become active.
| | ui-tabs--content-wrapper__is-closing | the animation content wrapper class to become inactive.
| | ui-tabs--content-wrapper__is-active | the active content wrapper.
Tab Content Body | ui-tabs--body | the Body class. This is where the content goes to.


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
            color: rgba(0, 0, 0, 0.5)
        
            &.ui-tabs--link__is-active {
                color: rgba(0, 0, 0, 1);
            }
            &.ui-tabs--link__is-entering {
                color: rgba(0, 0, 0, 1);
                transition: color 300ms ease;
            }
            &.ui-tabs--link__is-leaving {
                color: rgba(0, 0, 0, 0.5);
                transition: color 300ms ease;
            }
        }
        .ui-tabs--body {
            overflow: hidden;
            opacity: 0;
            transition: height 300ms ease;
        }
        .ui-tabs--content-wrapper {

            &.ui-tabs--content-wrapper__is-opening {
                opacity: 1;
                transition: opacity 300ms ease;
            }
            &.ui-tabs--content-wrapper__is-closing {
                opacity: 0;
                transition: opacity 300ms ease;
            }
            &.ui-tabs--content-wrapper__is-active {
                opacity: 1;
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

