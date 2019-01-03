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

### Input Slots

You can provide `<slot>`s (`label`, `actions` and `messages`) to customize its rendering:

#### Custom input label

```vue
<!-- custom label -->
<ui-input type="text">
    <span slot="label">
        My Fancy <i>Custom</i><b>Label</b>
    </span>
</ui-input>
```

#### Custom actions button/s

```vue
<ui-input type="search" placeholder="Search something...">
    <simple-btn slot="actions" @click="search">
        <ui-icon symbol="search" size="large"/>
    </simple-btn>
</ui-input>
```

Multiple actions are supported as well

```vue
<ui-input type="search" placeholder="Search something...">
    <template slot="actions">
         <simple-btn @click="search">
            <ui-icon symbol="search" size="large"/>
         </simple-btn>
         <simple-btn @click="clear">
            <ui-icon symbol="cancel" size="large"/>
         </simple-btn>
    </template>
</ui-input>
```

#### Custom input user messages 

You can render custom error messages via `messages` slot:

```vue
<ui-input type="text">
    <p slot="messages" class="error-message">Your field is invalid</p>
</ui-input>
```

### Attributes

The `<ui-input>` supports all the `<input>` attributes. 
It has supports also a custom attributes like `has-errors` in order to enable its error css classes and `has-floating-label` to render its label as material floating text.

```vue
<!-- Probably the mail was not correct -->
<ui-input type="email" :has-errors="true"/>

<ui-input type="text" :has-floating-label="true">
    <template slot="label">
        Ehy look I am floating
    </template>
</ui-input>

```

## Ui Textarea

The `ui-textaread` supports all the slots and attributes of the `ui-input` above. It has a nice feature that is really useful: depending on the amount of text it will
grow and shrink in height automatically.

```vue
<ui-textarea value="Lorem Ipsum"/>
```

## Ui checkbox and radio

The toggle input fields are a bit simpler than the ones above mentioned. They support only the `has-errors` attribute.

### Toggle Slots

#### Toggle labels

The label can be provided as for the `ui-input` component via `<slot>`:

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

#### Toggle icon

In case you want to customize the icon of these input fields you can use the `icon` slot:

```vue
<ui-checkbox>
    <ui-icon slot="icon" symbol="checkmark" size="large"/>
</ui-checkbox>
```

#### Custom toggle user messages 

```vue
<ui-checkbox type="text">
    <p slot="messages" class="success-message">Congrats you picked the right answer!</p>
</ui-checkbox>
```

## Ui Select

The `ui-select` component requires the `ui-option` and eventually `ui-optgroup` components to work properly:

```vue
<template>
    <form>
        <ui-select name="teams">
            <ui-option value="" disabled>Choose a team</ui-option>
            <ui-optgroup label="Europe">
                <ui-option value="it">Italy</ui-option>
                <ui-option value="de">Germany</ui-option>
                <ui-option value="ch">Switzerland</ui-option>
            </ui-optgroup>
            <ui-optgroup label="South America">
                <ui-option value="it">Brazil</ui-option>
                <ui-option value="de">Argentina</ui-option>
                <ui-option value="ch">Cile</ui-option>
            </ui-optgroup>
        </ui-select>    
    </form>
</template>

<script>
    import { UiSelect, UiOption, UiOptgroup } from '@dreipol/vue-ui/src/components';
    export default {
        components: {
            UiSelect,
            UiOption,
            UiOptgroup,
        }
    }
</script>
```

### Select Slots

Similar to the input fields above it supports the `label`, `messages` and `actions` slots:

```vue
<ui-select>
    <template slot="label">
        Select something
    </template>
    <ui-option value="one">1</ui-option>
    <ui-option value="two">2</ui-option>
    <ui-option value="three">3</ui-option>
    <p slot="messages" class="warning">
       Please choose widely 
    </p>
    <ui-icon slot="actions" symbol="checkmark" size="small"/>
</ui-select>
```

### Select attributes

The select checkmark icon can be defined not only via `actions` slot but also via `icon` attribute for example:

```vue
<ui-select :icon="{ symbol: 'close', size: 'small' }">
    <ui-option value="one">1</ui-option>
    <ui-option value="two">2</ui-option>
    <ui-option value="three">3</ui-option>
</ui-select>
```
