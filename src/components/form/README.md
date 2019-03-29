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

// This component will now be globally available
Vue.component('ui-input', UiInput);
```


## Ui Input
The `ui-input` component can be used as any standard DOM `<input>` field.

```vue
<ui-input type="tel" required/>
```

### Slots
You can provide the following `<slot>`s to customize its rendering:
- `label`
- `actions`
- `messages`

#### `label`

```vue
<ui-input type="text">
    <template v-slot:label>
        <span>
            My Fancy <i>Custom</i> <b>Label</b>
        </span>    
    </template>
</ui-input>
```

#### `actions`

```vue
<ui-input type="search" placeholder="Search something...">
    <simple-btn v-slot:actions @click="search">
        <ui-icon symbol="search" size="large"/>
    </simple-btn>
</ui-input>
```

Multiple actions are supported as well

```vue
<ui-input type="search" placeholder="Search something...">
    <template v-slot:actions>
         <simple-btn @click="search">
            <ui-icon symbol="search" size="large"/>
         </simple-btn>
         <simple-btn @click="clear">
            <ui-icon symbol="cancel" size="large"/>
         </simple-btn>
    </template>
</ui-input>
```

#### `messages`
You can render custom error messages via `messages` slot:

```vue
<ui-input type="email">
    <template v-slot:messages>
        <p class="error-message">Please provide a valid email address</p>
    </template>
</ui-input>
```

### Attributes
The `<ui-input>` supports all native `<input>` attributes.
In addition, the component includes the following custom attributes: 

#### `has-errors`
This attribute signals an invalid input state and adds the corresponding css class.

 ```vue
 <ui-input type="email" :has-errors="true"/>
 ```
 
 #### `has-floating-label`
Renders its label as a floating text label.

```vue
<ui-input type="text" :has-floating-label="true">
    <template v-slot:label>
        Look ma, I'm floating
    </template>
</ui-input>
```


## Ui Textarea
The `ui-textarea` supports the same slots and attributes as the `ui-input`.
In addition, the component provides a feature, allowing it to grow and shrink according to the amount of text entered.

```vue
<ui-textarea value="Lorem Ipsum"/>
```

### Slots
- `label`
- `actions`
- `messages`

### Custom attributes
- `has-errors` 
- `has-floating-label`


## Ui checkbox and radio
The toggle input fields render a single instance of a checkbox or radio button.

### Slots
- `label`
- `icon`
- `messages`

#### `label`
The label can be provided as for the `ui-input` component via `<slot>`:

```vue
<fieldset>
    <p>Choose your car:</p>
    <ui-radio name="cars" value="lamborghini">
        <template v-slot:label>Lamborghini</template>
    </ui-radio>
    <ui-radio name="cars" value="ferrari">
        <template v-slot:label>Ferrari</template>
    </ui-radio>
</fieldset>

<ui-checkbox name="is_on_sale">
    <template v-slot:label>Is on sale</template>
</ui-checkbox>
```

#### `icon`
You can alter the icon of the input fields by using the `icon` slot:

```vue
<ui-checkbox>
    <ui-icon v-slot:icon symbol="checkmark" size="large"/>
</ui-checkbox>
```

#### `messages`

```vue
<ui-checkbox type="text">
    <p v-slot:messages class="success-message">Congrats you picked the right answer!</p>
</ui-checkbox>
```

### Custom attributes
- `has-errors` attribute.


## Ui Select
The `ui-select` component requires the `ui-option` component to work properly.
The optional `ui-optgroup` component may be used to render native option groups.

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

### Slots
- `label`
- `actions`
- `messages`

```vue
<ui-select>
    <template v-slot:label>
        Select something
    </template>
    <ui-option value="one">1</ui-option>
    <ui-option value="two">2</ui-option>
    <ui-option value="three">3</ui-option>
    <p v-slot:messages class="warning">
       Please choose widely 
    </p>
    <ui-icon v-slot:actions symbol="checkmark" size="small"/>
</ui-select>
```

### Custom attributes
- `icon`

#### `icon`
The select checkmark icon can be defined not only via `actions` slot but also via `icon` attribute for example:

```vue
<ui-select :icon="{ symbol: 'close', size: 'small' }">
    <ui-option value="one">1</ui-option>
    <ui-option value="two">2</ui-option>
    <ui-option value="three">3</ui-option>
</ui-select>
```

You can also override the default select icon once and for all via `@dreipol/vue-ui/src/settings`:

```js
import settings, { SELECT_ICON } from '@dreipol/vue-ui/src/settings';

settings.set(SELECT_ICON, {
    symbol: 'arrow-down',
    size: 'medium'
});
```

## Ui hidden
The `ui-hidden` component renders an invisible `<input type='hidden'/>` dom node.

```vue
<ui-hidden name="token" value="secret_token"/>
```


## Model Provider
All input fields can be connected via two-way binding to a vue model. To achieve this, you need the `ui-model-provider`.
In a nutshell: The input fields are responsible for user events and rendering while the `ui-model-provider` enhances them by adding reactivity.

```vue
<template>
    <ui-model-provider v-model="username" v-slot="{ value, updateValue }">
        <ui-input :value="value" @input="updateValue"/>  
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
    - `value`: The current internal model value
    - `updateValue`: A function that will automatically update the internal model depending on the input that dispatched the event
    - `updateValueRaw`: A function that will directly update the value of the internal model 
    - `updateToggle`: A function that toggles the internal model value
    - `hasItem`: A function that will be used to check if the internal model contains a specific value, if it's an array
    - `addItem`: A function to add a value to the internal model, if it's an array
    - `removeItem`: A function to remove a value from the internal model, if it's an array

### Practical examples

#### Model provider with toggles
Here you can see an example of a boolean `ui-checkbox` input bound to a model provider. 
Assuming that the `value` is a boolean and can be either `true` or `false`

```vue
<ui-model-provider v-model="value" v-slot="{ value, updateValue }">
    <ui-checkbox :value="value" @change="updateValue"/>
</ui-model-provider>
```

#### Model provider with multiple radios
Here you can see an example of `ui-radio` inputs bound to a model provider. 
Assuming that the `value` must be one of those two strings: `['one', 'two']`

```vue
<ui-model-provider v-model="value" v-slot="{ value, updateValue }">
    <div>
         <ui-radio :checked="value === 'one'" value='one' @change="updateValue"/>
         <ui-radio :checked="value === 'two'" value='two' @change="updateValue"/>
    </div>
</ui-model-provider>
```

#### Model provider with multiple checkboxes
This is an example of a `ui-checkbox` inputs bound to a model provider.
Assuming that the `value` is an array containing none or multiple items of `['one', 'two', 'three']`

```vue
<ui-model-provider v-model="value" v-slot="{ hasItem, updateValue }">
    <div>
        <ui-checkbox :checked="hasItem('one')" value='one' @change="updateValue"/>
        <ui-checkbox :checked="hasItem('two')" value='two' @change="updateValue"/>
        <ui-checkbox :checked="hasItem('three')" value='three' @change="updateValue"/>
    </div>
</ui-model-provider>
```

#### Model Provider with select
This is an example of a `ui-select` input bound to a model provider. 
Assuming that the `value` must be one of those two strings: `['one', 'two']`

```vue
 <ui-model-provider v-model="value" v-slot="{ value, updateValue }">
    <ui-select :value="value" @change="updateValue">
        <ui-option value="one">One</ui-option>
        <ui-option value="two">Two</ui-option>
    </ui-select>
</ui-model-provider>
```
