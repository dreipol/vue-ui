<template>
    <div class="form-field form-field__input form-field__select" :class="rootClasses">
        <label>
            <div class="form-field--title-label" v-if="$scopedSlots.label">
                <slot name="label"/>
            </div>
            <div class="form-field--input-container" :data-action-count="countVirtualtags($scopedSlots.actions) || 1">
                <select class="form-field--input"
                        v-model="currentValue"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners"
                >
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
    import countVirtualtags from '../../../util/count-virtual-tags';
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
        methods: {
            countVirtualtags,
        },
    };
</script>
