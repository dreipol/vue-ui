# UiTabs

Tabs component that could be used in a SPA or even as simple enhancement for your DOM components

## Usage

```js
import { UiTabs } from '@dreipol/vue-ui'
```

## Tabs Props

| Name              | Type           | Default | Description                                                                   |
| ----------------- | -------------- | ------- | ----------------------------------------------------------------------------- |
| `initialActiveId` | Number or null | null    | Initially sets active tab. If not set it will set first the first tab active. |
| `isLazy`          | Boolean        | true    | Set isLazy to false will render all tabs content at once.                     |

## Template Slots

| Name    | Description                 |
| ------- | --------------------------- |
| tab     | Will render the Tab         |
| content | Will render the Tab Content |

## Example

```vue
<!-- basic usage -->
<ui-tabs
  :initial-active-id="2"
> <!-- the index of the tab content that should be displayed -->

    <!-- The tabs buttons will be dynamically rendered depending on the tabs attributes below -->
    <template slot-scope="props" slot="tab">
        <h1>{{ props.title }}</h1><!-- For Example: "Tab Title 2" -->
    </template>
    
    <!-- Place your tab contents here -->
    <template slot="content">    
        <section title="Tab Title 1">
            <h1>Title 1</h1>
            <p>Content Text 1</p>
        </section>
        <section title="Tab Title 2">
            <h1>Title 2</h1>
            <p>Content Text 2</p>
        </section>
        <section title="Tab Title 3">
            <h1>Title 3</h1>
            <p>Content Text 3</p>
        </section>
    </template>

</ui-tabs>
```

## Classes

| Name                            | Description                        |
| ------------------------------- | ---------------------------------- |
| ui-tabs                         | Base class                         |
| ui-tabs\_\_list                 | Wrapper class of tab list          |
| ui-tabs\_\_list-item            | list item class                    |
| ui-tabs\_\_list-item--is-active | active list item class             |
| ui-tabs\_\_panel-wrapper        | Panel wrapper and transition class |
| ui-tabs\_\_panel                |
| ui-tabs\_\_panel-enter          | Panel on enter class               |
| ui-tabs\_\_panel-enter-active   | Panel active enter animation class |
| ui-tabs\_\_panel-leave-to       | Panel on leave-to class            |
| ui-tabs\_\_panel-leave-active   | Panel active leave animation class |

## SCSS

```scss
.ui-tabs {
  // Vars

  // Support

  // Module
  & {
    .ui-tabs__list {
      display: flex;

      .ui-tabs__list-item {
        padding: 20px;
        color: rgba(0, 0, 0, 0.5);

        &.ui-tabs__list-item--is-active {
          color: rgba(0, 0, 0, 1);
        }
      }
    }

    .ui-tabs__panel-wrapper {
      .ui-tabs__panel {
        &.ui-tabs__panel-enter {
          opacity: 0;
          transform: translateY(30px);
        }

        &.ui-tabs__panel-enter-active {
          transition: all 1s;
        }

        &.ui-tabs__panel-leave-active {
          transition: all 1s;
        }

        &.ui-tabs__panel-leave-to {
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

## Note

In order import from the `src` folder and transpile this component you will need to install [`@vue/babel-plugin-transform-vue-jsx`](https://www.npmjs.com/package/@vue/babel-plugin-transform-vue-jsx) in your babel setup
