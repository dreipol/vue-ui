# Vuex modules

Our vuex modules can be simply included in your project. You can add singularly each of them to your vuex project modules for example:

```js
import { scrollVuexModule } from '@dreipol/vue-ui/src/vuex';

const store = new Vuex.Store({
    modules: {
        scroll: scrollVuexModule
    },
});
```

The current vuex modules provided are:

- [scroll](/src/vuex/modules/scroll)
- [overlay](/src/vuex/modules/overlay)

