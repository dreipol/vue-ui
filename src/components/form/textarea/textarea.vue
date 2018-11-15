<template>
    <div class="form-field form-field__input form-field__textarea" :class="rootClasses">
        <label>
            <span class="form-field--title-label" v-if="!hasFloatingLabel">
                <slot/>
            </span>
            <div class="form-field--input-container" :data-action-count="0">
                <span class="form-field--floating-label" v-if="hasFloatingLabel">
                    <slot/>
                </span>
                <textarea class="form-field--input"
                        ref="input"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners"
                />
            </div>
        </label>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Messages from '../messages/messages.vue';
    import bemMixin from 'mixins/bem';
    import inputFieldRootClassesMixin from 'mixins/form/root-classes';
    import inputFieldFloatingLabelPropsMixin from 'mixins/form/floating-label-props';
    import inputFieldFocusBehaviourMixin from 'mixins/form/focus-behaviour';
    import inputFieldMessagesPropsMixin from 'mixins/form/messages-props';

    const TEXTAREA_BORDER_WIDTH = 1;
    const TEXTAREA_MAX_HEIGHT = 240;

    export default {
        components: {
            Messages,
        },
        mixins: [
            bemMixin('form-field'),
            inputFieldRootClassesMixin,
            inputFieldFloatingLabelPropsMixin,
            inputFieldFocusBehaviourMixin,
            inputFieldMessagesPropsMixin,
        ],
        props: {
            value: {
                type: [Number, String],
                required: true,
            },
        },
        methods: {
            updateHeight(isExpanding) {
                const { input } = this.$refs;

                if (!input) {
                    return;
                }

                if (input.offsetHeight > TEXTAREA_MAX_HEIGHT) {
                    input.style.overflow = 'auto';
                    return;
                }

                if (isExpanding) {
                    const contentHeight = input.scrollHeight + (TEXTAREA_BORDER_WIDTH * 2);
                    input.style.height = this.value ? `${ Math.min(TEXTAREA_MAX_HEIGHT, contentHeight) }px` : 'auto';
                    input.style.overflow = contentHeight >= TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';
                }
            },
        },
        watch: {
            value: {
                immediate: false,
                handler(newValue, oldValue) {
                    this.updateHeight(newValue.length > oldValue.length);
                },
            },
        },
        mounted() {
            this.updateHeight(true);
        },
    };
</script>
