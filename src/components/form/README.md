# Form fields
The input fields contained in this folder can be rendered in any `<form>` element to enhance the behaviour of the default ones. 
Let's assume for example that you want to use the checkbox component in your vue form:

```vue
<template>
    <form>
        <ui-checkbox name="is_cool"/>    
    </form>
</template>

<script>
    import { UiCheckbox } from '@dreipol/vue-ui/src/components';
    export default {
        components: {
            UiCheckbox,
        }
    }
</script>
```

In case you want to use these components globally, without always importing them in any of your forms, you will need to register them via Vue:

```js
import { UiInput } from '@dreipol/vue-ui/src/components';
import Vue from 'vue';

// this component will be now globally available
Vue.component('ui-input', UiInput);
```

## Ui Input

The `ui-input` component can be used as any standard DOM `<input>` field. 

```vue
<ui-input type="tel" required/>
```

You can use `<slot>`s to customize its `label`, `actions` and `messages`:

```vue
<!-- custom label -->
<ui-input type="text">
    <span slot="label">
        My Fancy <i>Custom</i><b>Label</b>
    </span>
</ui-input>

<!-- custom search actions button -->
<ui-input type="search" placeholder="Search something...">
    <simple-btn slot="actions" @click="search">
        <ui-icon symbol="search" size="large"/>
    </simple-btn>
</ui-input>

<!-- custom user messages -->
<ui-input type="search" placeholder="Search something...">
    <template slot="messages">
        <p class="error-message">Your field is invalid</p>
    </template>
</ui-input>
```

The `<ui-input>` supports all the `<input>` attributes. 
It has supports also a custom attributes like `has-errors` in order to enable its error css classes and `has-floating-label` to render its label as material floating text.

```vue
<!-- Probably the mail was not correct -->
<ui-input type="email" :has-errors="true"/>
```

## Ui Textarea

The `ui-textaread` supports all the slots and attributes of the `ui-input` above. It has a nice feature that is really useful: depending on the amount of text it will
grow and shrink in height automatically.

```vue
<ui-textarea value="Lorem Ipsum"/>
```

## Ui checkbox and radio

The toggle input fields are a bit simpler than the ones above mentioned. They support only the `has-errors` attribute.
The label can be specified as for the `ui-input` via `<slot>`:

```vue
<fieldset>
    <p>Choose your car:</p>
    <ui-radio name="cars" value="lamborghini">
        <template slot="label">Lamborghini</template>
    </ui-radio>
    <ui-radio name="cars" value="ferrari">
        <template slot="label">Ferrari</template>
    </ui-radio>
</fieldset>

<ui-checkbox name="is_on_sale">
    <template slot="label">Is on sale</template>
</ui-checkbox>
```
