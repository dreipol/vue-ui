<template>
    <div class="ui-form-field ui-form-field__input" :class="rootClasses">
        <label>
            <span class="ui-form-field--title-label" v-if="!hasFloatingLabel && $scopedSlots.label">
                <slot name="label"/>
            </span>
            <div class="ui-form-field--input-container" :data-action-count="actionCount">
                <span class="ui-form-field--floating-label" v-if="hasFloatingLabel && $scopedSlots.label">
                    <slot name="label"/>
                </span>
                <slot name="input">
                    <input v-model="currentValue"
                            class="ui-form-field--input"
                            v-bind="$attrs"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-on="$listeners">
                </slot>
                <ui-actions>
                    <slot name="actions"/>
                </ui-actions>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import UiActions from '../actions/actions.vue';
    import { getVNodes } from '../../../util/vnodes';
    import bemMixin from '../../../mixins/bem';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import floatingLabelPropsMixin from '../../../mixins/form/floating-label-props';
    import focusBehaviourMixin from '../../../mixins/form/focus-behaviour';
    import currentValueMixin from '../../../mixins/form/current-value';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';

    export default {
        components: {
            UiActions,
        },
        mixins: [
            bemMixin('ui-form-field'),
            focusBehaviourMixin,
            rootClassesMixin,
            floatingLabelPropsMixin,
            currentValueMixin,
            hasErrorsPropsMixin,
        ],
        props: {
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
