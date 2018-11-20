<template>
    <div class="form-field form-field__bool form-field__checkbox" :class="[...rootClasses, bemIf(value, 'is-checked')]">
        <label>
            <input type="checkbox"
                    class="form-field--input"
                    :value="value"
                    v-on="listeners"
                    v-bind="$attrs"
            >
            <div class="form-field--label-wrap">
                <span class="form-field--box">
                    <base-icon class="form-field--box-icon" symbol="checkmark" size="small"/>
                </span>
                <div class="form-field--label">
                    <slot name="label"/>
                </div>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import bemMixin from './mixins/bem';
    import inputFieldRootClassesMixin from './mixins/form/root-classes';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';

    export default {
        mixins: [
            bemMixin('form-field'),
            inputFieldMessagesPropsMixin,
            inputFieldRootClassesMixin,
        ],
        props: {
            value: {
                type: [String, Boolean],
                required: true,
            },
        },
    };
</script>
