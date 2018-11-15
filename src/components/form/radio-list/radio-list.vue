<template>
    <div class="form-field form-field__list form-field_radio-list">
        <div class="form-field--row">
            <div class="form-field--container" v-for="(item, index) in items" :key="index">
                <radio v-bind="item" v-on="$listeners">
                    <slot v-bind="item"/>
                </radio>
            </div>
        </div>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Radio from './components/radio/radio.vue';
    import Messages from './components/form/messages/messages.vue';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';

    export default {
        components: {
            Messages,
            Radio,
        },
        mixins: [
            inputFieldMessagesPropsMixin,
        ],
        props: {
            value: {
                type: [String, Number, Boolean],
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
