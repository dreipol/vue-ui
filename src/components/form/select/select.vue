<template>
    <div class="ui-form-field ui-form-field__input ui-form-field__select" :class="rootClasses">
        <label>
            <div class="ui-form-field--title-label" v-if="$scopedSlots.label">
                <slot name="label"/>
            </div>
            <div class="ui-form-field--input-container" :data-action-count="actionCount || 1">
                <select v-model="currentValue"
                        class="ui-form-field--input"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners">
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
    import settings, { SELECT_ICON } from '../../../settings';
    import UiIcon from '../../icon/icon.vue';
    import { getVNodes } from '../../../util/vnodes';
    import bemMixin from '../../../mixins/bem';
    import focusBehaviourMixin from '../../../mixins/form/focus-behaviour';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import currentValueMixin from '../../../mixins/form/current-value';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';

    export default {
        components: {
            UiIcon,
            UiActions,
        },
        mixins: [
            bemMixin('ui-form-field'),
            focusBehaviourMixin,
            rootClassesMixin,
            hasErrorsPropsMixin,
            currentValueMixin,
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
