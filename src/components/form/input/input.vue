<template>
    <div class="form-field form-field__input" :class="rootClasses">
        <label>
            <span class="form-field--title-label" v-if="!hasFloatingLabel">
                <slot>{{ label }}</slot>
            </span>
            <div class="form-field--input-container" :data-action-count="0">
                <span class="form-field--floating-label" v-if="hasFloatingLabel">
                    <slot>{{ label }}</slot>
                </span>
                <input class="form-field--input"
                        ref="input"
                        :type="type"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners"
                >
            </div>
        </label>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Messages from './components/form/messages/messages.vue';
    import bemMixin from './mixins/bem';
    import inputFieldRootClassesMixin from './mixins/form/root-classes';
    import inputFieldFloatingLabelPropsMixin from './mixins/form/floating-label-props';
    import inputFieldFocusBehaviourMixin from './mixins/form/focus-behaviour';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';

    export default {
        components: {
            Messages,
        },
        mixins: [
            bemMixin('form-field'),
            inputFieldFocusBehaviourMixin,
            inputFieldRootClassesMixin,
            inputFieldFloatingLabelPropsMixin,
            inputFieldMessagesPropsMixin,
        ],
        props: {
            value: {
                type: [Number, String],
                required: true,
            },
            label: {
                type: String,
                default() {
                    return '';
                },
            },
            type: {
                type: String,
                default: 'text',
            },
        },
    };
</script>
