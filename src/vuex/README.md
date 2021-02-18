# Vuex modules

These vuex modules provide functionality for some components and are necessary for them to work.

## Usage

These modules can be added to your project store. They are scoped within the `vue-ui` namespace.

```js
import { uiScrollVuexModule } from '@dreipol/vue-ui'

const store = new Vuex.Store({
  modules: {
    'vue-ui': {
      namespaced: true,
      scroll: uiScrollVuexModule,
    },
  },
})
```

## Available modules:

- [scroll](/src/vuex/modules/scroll)
- [overlay](/src/vuex/modules/overlay)
