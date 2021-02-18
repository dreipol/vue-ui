<template>
    <div class="ui-form-field ui-form-field--input ui-form-field--select" :class="rootClasses">
        <label>
            <div class="ui-form-field__title-label" v-if="!hasFloatingLabel && $scopedSlots.label">
                <slot name="label"/>
            </div>
            <div class="ui-form-field__input-container" :data-action-count="actionCount || 1">
                <span class="ui-form-field__floating-label" v-if="hasFloatingLabel && $scopedSlots.label">
                    <slot name="label"/>
                </span>
                <select v-model="currentValue"
                        class="ui-form-field__input"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners">
                    <ui-option value=""
                            disabled
                            selected
                            v-if="$attrs.placeholder">
                        {{ $attrs.placeholder }}
                    </ui-option>
                    <slot/>
                </select>
                <ui-actions>
                    <slot name="actions">
                        <ui-icon v-bind="icon"/>
                    </slot>
                </ui-actions>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import UiActions from '../actions/actions.vue';
    import UiOption from '../option/option.vue';
    import settings, { SELECT_ICON } from '../../../settings';
    import UiIcon from '../../icon/icon.vue';
    import { getVNodes } from '../../../util/vnodes';
    import bemMixin from '../../../mixins/bem';
    import focusBehaviourMixin from '../../../mixins/form/focus-behaviour';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import currentValueMixin from '../../../mixins/form/current-value';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';
    import floatingLabelPropsMixin from '../../../mixins/form/floating-label-props';

    export default {
        components: {
            UiIcon,
            UiActions,
            UiOption,
        },
        mixins: [
            bemMixin('ui-form-field'),
            focusBehaviourMixin,
            rootClassesMixin,
            hasErrorsPropsMixin,
            currentValueMixin,
            floatingLabelPropsMixin,
        ],
        props: {
            icon: {
                type: Object,
                default() {
                    return settings.get(SELECT_ICON);
                },
            },
            value: {
                type: [Number, String],
                default: '',
            },
        },
        computed: {
            actionCount() {
                return getVNodes(this.$scopedSlots.actions).length;
            },
        },
    };
</script>
