<template>
    <div class="form-field form-field__bool form-field__checkbox"
            :class="[...rootClasses, bemIf(isChecked, 'is-checked')]">
        <label>
            <input type="checkbox"
                    class="form-field--input"
                    :value="value"
                    v-bind="$attrs"
                    @change="onChange"
                    v-on="$listeners"
            >
            <div class="form-field--label-wrap">
                <span class="form-field--box">
                    <slot mame="icon">
                        <ui-icon class="form-field--box-icon" symbol="checkmark" size="small"/>
                    </slot>
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
    import UiIcon from '../../icon/icon.vue';
    import bemMixin from '../../../mixins/bem';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import isCheckedMixin from '../../../mixins/form/is-checked';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';

    export default {
        components: {
            UiIcon,
        },
        mixins: [
            bemMixin('form-field'),
            rootClassesMixin,
            isCheckedMixin,
            hasErrorsPropsMixin,
        ],
        props: {
            value: {
                type: [String, Boolean],
                default: false,
            },
        },
    };
</script>
