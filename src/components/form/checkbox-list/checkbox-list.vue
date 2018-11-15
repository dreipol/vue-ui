<template>
    <div class="form-field form-field__list form-field__checkbox-list">
        <div class="form-field--row">
            <div class="form-field--container" v-for="(item, index) in items" :key="index">
                <checkbox v-on="$listeners" v-bind="item">
                    <slot v-bind="item"/>
                </checkbox>
            </div>
        </div>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Checkbox from './components/form/checkbox/checkbox.vue';
    import Messages from './components/form/messages/messages.vue';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';

    export default {
        components: {
            Messages,
            Checkbox,
        },
        mixins: [
            inputFieldMessagesPropsMixin,
        ],
        props: {
            value: {
                type: [Array, String, Number, Boolean],
                required: true,
            },
            /** @type IFieldItem[] */
            items: {
                type: Array,
                required: true,
            },
        },
    };
</script>
