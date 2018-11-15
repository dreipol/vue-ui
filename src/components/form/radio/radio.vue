<template>
    <div class="form-field form-field__bool form-field__radio"
            :class="[...rootClasses, bemIf(value, 'is-checked')]">
        <label>
            <input type="radio"
                    class="form-field--input"
                    v-bind="$attrs"
                    v-on="$listeners"
            >
            <div class="form-field--label-wrap">
                <span class="form-field--box">
                    <base-icon class="form-field--box-icon" symbol="checkmark" size="small"/>
                </span>
                <div class="form-field--label">
                    <slot>{{ label }}</slot>
                </div>
            </div>
        </label>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Messages from './components/form/messages/messages.vue';
    import bemMixin from './mixins/bem';
    import inputFieldRootClassesMixin from './mixins/form/root-classes';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';

    export default {
        components: {
            Messages,
        },
        mixins: [
            bemMixin('form-field'),
            inputFieldMessagesPropsMixin,
            inputFieldRootClassesMixin,
        ],
        props: {
            value: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default() {
                    return '';
                },
            },
        },
    };
</script>
