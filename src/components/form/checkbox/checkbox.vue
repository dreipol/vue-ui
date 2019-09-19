<template>
    <div class="ui-form-field ui-form-field__bool ui-form-field__checkbox"
            :class="[...rootClasses, bemIf(isChecked, 'is-checked')]">
        <label>
            <input type="checkbox"
                    class="ui-form-field--input"
                    :value="value"
                    v-bind="$attrs"
                    @change="onChange"
                    v-on="$listeners">
            <div class="ui-form-field--label-wrap">
                <span class="ui-form-field--box">
                    <slot mame="icon">
                        <ui-icon class="ui-form-field--box-icon" v-bind="icon"/>
                    </slot>
                </span>
                <div class="ui-form-field--label">
                    <slot name="label"/>
                </div>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import settings, { CHECKBOX_ICON } from '../../../settings';
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
            bemMixin('ui-form-field'),
            rootClassesMixin,
            isCheckedMixin,
            hasErrorsPropsMixin,
        ],
        props: {
            value: {
                type: [String, Boolean],
                default: false,
            },
            icon: {
                type: Object,
                default() {
                    return settings.get(CHECKBOX_ICON);
                },
            },
        },
    };
</script>
