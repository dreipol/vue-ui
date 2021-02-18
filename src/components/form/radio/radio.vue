<template>
    <div class="ui-form-field ui-form-field--bool ui-form-field--radio"
            :class="[...rootClasses, bemIf(isChecked, 'is-checked')]">
        <label>
            <input type="radio"
                    class="ui-form-field__input"
                    v-bind="$attrs"
                    :value="value"
                    @change="onChange"
                    v-on="$listeners">
            <div class="ui-form-field__label-wrap">
                <span class="ui-form-field__box">
                    <slot mame="icon">
                        <span class="ui-form-field__box-icon"/>
                    </slot>
                </span>
                <div class="ui-form-field__label">
                    <slot name="label"/>
                </div>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import bemMixin from '../../../mixins/bem';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import isCheckedMixin from '../../../mixins/form/is-checked';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';

    export default {
        mixins: [
            bemMixin('ui-form-field'),
            rootClassesMixin,
            isCheckedMixin,
            hasErrorsPropsMixin,
        ],
        props: {
            value: {
                type: String,
                required: true,
            },
        },
    };
</script>
