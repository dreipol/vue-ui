<template>
    <div class="form-field form-field__input form-field__select" :class="rootClasses">
        <label>
            <div class="form-field--title-label" v-if="label">
                {{ label }}
            </div>
            <div class="form-field--input-container" :data-action-count="1">
                <select class="form-field--input"
                        v-if="isMounted"
                        v-bind="$attrs"
                        @focus="onFocus"
                        @blur="onBlur"
                        v-on="$listeners"
                >
                    <option disabled
                            v-if="placeholder"
                            :selected="!value">
                        {{ placeholder }}
                    </option>
                    <slot></slot>
                </select>
                <div class="form-field--actions">
                    <span class="form-field--action form-field--action__arrow">
                        <base-icon v-bind="icon"/>
                    </span>
                </div>
            </div>
        </label>
        <messages :messages="messages"/>
    </div>
</template>

<script>
    import Messages from './components/form/messages/messages.vue';
    import bemMixin from './mixins/bem';
    import isMounted from './mixins/is-mounted';
    import inputFieldMessagesPropsMixin from './mixins/form/messages-props';
    import inputFieldFocusBehaviourMixin from './mixins/form/focus-behaviour';
    import inputFieldRootClassesMixin from './mixins/form/root-classes';


    export default {
        components: {
            Messages,
        },
        mixins: [
            bemMixin('form-field'),
            isMounted,
            inputFieldFocusBehaviourMixin,
            inputFieldMessagesPropsMixin,
            inputFieldRootClassesMixin,
        ],
        props: {
            value: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                default() {
                    return '';
                },
            },
            placeholder: {
                type: String,
                default() {
                    return '';
                },
            },
            icon: {
                type: Object,
                default() {
                    return {
                        symbol: 'chevron-down',
                        size: 'medium',
                    };
                },
            },
        },
    };
</script>
