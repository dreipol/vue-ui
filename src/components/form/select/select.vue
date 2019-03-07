<template>
    <div class="form-field form-field__input form-field__select" :class="rootClasses">
        <label>
            <div class="form-field--title-label" v-if="$scopedSlots.label">
                <slot name="label"/>
            </div>
            <div class="form-field--input-container" :data-action-count="actionCount || 1">
                <select v-model="currentValue"
                        class="form-field--input"
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
            bemMixin('form-field'),
            focusBehaviourMixin,
            rootClassesMixin,
            hasErrorsPropsMixin,
            currentValueMixin,
        ],
        props: {
            icon: {
                type: Object,
                default() {
                    return {
                        symbol: 'chevron-down',
                        size: 'medium',
                    };
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
