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
        },
    };
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
        },
    };
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

## Ui Hidden

There is not really much to say about the `ui-hidden` component, it just renders a `<input type='hidden'/>` dom node.

```vue
<ui-hidden name="token" value="secret_token"/>
```

## Model Provider

All the input fields can be connected via double way binding to a vue model. To achieve this behavior you need to use the `ui-model-provider`.
In a nutshell: all input fields will be only responsible for the user events and the rendering of our data while the `ui-model-provider` will enhance them adding the reactivity to the system.

```vue
<template>
    <ui-model-provider v-model="username">
        <ui-input slot-scope="props" :value="props.value" @input="props.updateValue"/>  
    </ui-model-provider>
</template>

<script>
    import { UiInput, UiModelProvider } from '@dreipol/vue-ui/src/components';
    export default {
        components: {
            UiInput,
            UiModelProvider
        },
        data() {
            return {
                username: 'Gian'
            };
        },
    };
</script>
```

### Slot scope properties

The model provider exposes the following properties to its slots:
    - `value`: the current internal model value
    - `updateValue`: a function that will automatically update the internal model depending on the input that dispatched the event
    - `updateValueRaw`: a function that will directly update the value of the internal model 
    - `updateToggle`: a function that toggles the internal model value
    - `hasItem`: a function that will be used to check if the internal model has contains a specific value, if it's an array
    - `addItem`: a function to add a value to the internal model, if it's an array
    - `removeItem`: a function to remove a value from the internal model, if it's an array

### Practical Examples

#### Model provider with toggles

Here you can see an example of a boolean `ui-checkbox` input bound to a model provider. 
Assuming that the `value` is a boolean and can be either `true` or `false`

```vue
<ui-model-provider v-model="value">
    <ui-checkbox slot-scope="props" :value="props.value" @change="props.updateValue"/>
</ui-model-provider>
```

#### Model provider with multiple radios

Here you can see an example of `ui-radio` inputs bound to a model provider. 
Assuming that the `value` can be only a string, one of `['one', 'two']`

```vue
<ui-model-provider v-model="value">
    <div slot-scope="props">
         <ui-radio :checked="props.value === 'one'" value='one' @change="props.updateValue"/>
         <ui-radio :checked="props.value === 'two'" value='two' @change="props.updateValue"/>
    </div>
</ui-model-provider>
```

#### Model provider with multiple checkboxes

Here you can see an example of `ui-checkbox` inputs bound to a model provider.
Assuming that the `value` is an array containing none or many items of `['one', 'two', 'three']`

```vue
<ui-model-provider v-model="value">
    <div slot-scope="props">   
        <ui-checkbox :checked="props.hasItem('one')" value='one' @change="props.updateValue"/>
        <ui-checkbox :checked="props.hasItem('two')" value='two' @change="props.updateValue"/>
        <ui-checkbox :checked="props.hasItem('three')" value='three' @change="props.updateValue"/>
    </div>
</ui-model-provider>
```

#### Model Provider with select

Here you can see an example of `ui-select` input bound to a model provider. 
Assuming that the `value` can be only a string, one of `['one', 'two']`

```vue
 <ui-model-provider v-model="value">
    <ui-select slot-scope="props" :value="props.value" @change="props.updateValue">
        <ui-option value="one">One</ui-option>
        <ui-option value="two">Two</ui-option>
    </ui-select>
</ui-model-provider>
```
