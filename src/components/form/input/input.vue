<template>
    <div class="form-field form-field__input" :class="rootClasses">
        <label>
            <span class="form-field--title-label" v-if="!hasFloatingLabel && $slots.label">
                <slot name="label"/>
            </span>
            <div class="form-field--input-container" :data-action-count="virtualTagsCount($slots.actions)">
                <span class="form-field--floating-label" v-if="hasFloatingLabel && $slots.label">
                    <slot name="label"/>
                </span>
                <slot name="input">
                    <input class="form-field--input"
                            v-bind="$attrs"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-model="currentValue"
                            v-on="$listeners"
                    >
                </slot>
                <ui-actions>
                    <slot name="actions"/>
                </ui-actions>
            </div>
        </label>
        <slot name="messages"></slot>
    </div>
</template>

<script>
    import UiActions from '../actions/actions.vue';
    import virtualTagsCount from '../../../util/virtual-tags-count';
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
            bemMixin('form-field'),
            focusBehaviourMixin,
            rootClassesMixin,
            floatingLabelPropsMixin,
            currentValueMixin,
            hasErrorsPropsMixin,
        ],
        methods: {
            virtualTagsCount,
        },
        props: {
            value: {
                type: [Number, String],
                required: true,
            },
        },
    };
</script>
