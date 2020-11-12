# UiTabs
Tabs component that could be used in a SPA or even as simple enhancement for your DOM components

## Usage
```js
import { UiTabs } from '@dreipol/vue-ui';
```

## Tabs Props
| Name | Type | Default | Description
| --- | --- | ---| ---|
|`initialActiveId` | Number or null | null | Initially sets active tab. If not set it will set first the first tab active.
|`isLazy` | Boolean | true | Set isLazy to false will render all tabs content at once.

## Template Slots
| Name | Description
| --- | --- |
|tab | Will render the Tab 
|content | Will render the Tab Content


## Example
```vue
<!-- basic usage -->
<ui-tabs>
    <template slot-scope="props" slot="tab">
        <div>{{ props.title }}</div>
    </template>
    <template slot="content">
        <div title="Tab Title 1">
            <h1>Title 1</h1>
            <p>Content Text 1</p>
        </div>
    </template>
</ui-tabs>
```

## Classes
| Name | Description
| --- | --- |
| ui-tabs | Base class
| ui-tabs--list | Wrapper class of tab list
| ui-tabs--list-item | list item class
| ui-tabs--list-item__is-active | active list item class
| ui-tabs--panel-wrapper | Panel wrapper and transition class
| ui-tabs--panel | 
| ui-tabs--panel-enter | Panel on enter class
| ui-tabs--panel-enter-active | Panel active enter animation class
| ui-tabs--panel-leave-to | Panel on leave-to class
| ui-tabs--panel-leave-active | Panel active leave animation class

## SCSS

```scss
.ui-tabs {
    // Vars

    // Support

    // Module
    & {
        .ui-tabs--list {
            display: flex;

            .ui-tabs--list-item {
                padding: 20px;
                color: rgba(0, 0, 0, 0.5);
                
                &.ui-tabs--list-item__is-active {
                    color: rgba(0, 0, 0, 1);
                }
            }
        }

        .ui-tabs--panel-wrapper {
            .ui-tabs--panel {
                &.ui-tabs--panel-enter {
                    opacity: 0;
                    transform: translateY(30px);
                }
    
                &.ui-tabs--panel-enter-active {
                    transition: all 1s;
                }
    
                &.ui-tabs--panel-leave-active {
                    transition: all 1s;
                }
    
                &.ui-tabs--panel-leave-to {
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
        }
    }

    // Facets
    & {
       
    }

    // States
}

```

