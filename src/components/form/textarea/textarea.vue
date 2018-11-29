<template>
    <div class="form-field form-field__input form-field__textarea" :class="rootClasses">
        <label>
            <span class="form-field--title-label" v-if="!hasFloatingLabel && $slots.label">
                <slot name="label"/>
            </span>
            <div class="form-field--input-container" :data-action-count="virtualTagsCount($slots.actions)">
                <span class="form-field--floating-label" v-if="hasFloatingLabel && $slots.label">
                    <slot name="label"/>
                </span>
                <textarea class="form-field--input"
                        ref="input"
                        v-model="currentValue"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners"
                />
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
    import bemMixin from '../../../mixins/bem';
    import virtualTagsCount from '../../../util/virtual-tags-count';
    import rootClassesMixin from '../../../mixins/form/root-classes';
    import floatingLabelPropsMixin from '../../../mixins/form/floating-label-props';
    import focusBehaviourMixin from '../../../mixins/form/focus-behaviour';
    import currentValueMixin from '../../../mixins/form/current-value';
    import hasErrorsPropsMixin from '../../../mixins/form/has-errors-props';

    const TEXTAREA_BORDER_WIDTH = 1;
    const TEXTAREA_MAX_HEIGHT = 240;

    export default {
        components: {
            UiActions,
        },
        mixins: [
            bemMixin('form-field'),
            rootClassesMixin,
            currentValueMixin,
            floatingLabelPropsMixin,
            focusBehaviourMixin,
            hasErrorsPropsMixin,
        ],
        props: {
            value: {
                type: [Number, String],
                default() {
                    return '';
                },
            },
        },
        methods: {
            virtualTagsCount,
            updateHeight(isExpanding) {
                const { input } = this.$refs;

                if (input.offsetHeight > TEXTAREA_MAX_HEIGHT) {
                    input.style.overflow = 'auto';
                    return;
                }

                if (isExpanding) {
                    const contentHeight = input.scrollHeight + (TEXTAREA_BORDER_WIDTH * 2);
                    input.style.height = this.currentValue ? `${ Math.min(TEXTAREA_MAX_HEIGHT, contentHeight) }px` : 'auto';
                    input.style.overflow = contentHeight >= TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';
                }
            },
        },
        watch: {
            currentValue: {
                immediate: false,
                handler(newValue, oldValue) {
                    this.updateHeight(newValue.length !== oldValue.length);
                },
            },
        },
        mounted() {
            this.updateHeight(true);
        },
    };
</script>
