<template>
    <div class="form-field form-field__input form-field__select" :class="rootClasses">
        <label>
            <div class="form-field--title-label" v-if="$slots.label">
                <slot name="label"/>
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
                    <slot mame="items"/>
                </select>
                <actions>
                    <base-icon v-bind="icon"/>
                </actions>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import Actions from './components/form/actions/actions.vue';
    import bemMixin from './mixins/bem';
    import isMounted from './mixins/is-mounted';
    import inputFieldFocusBehaviourMixin from './mixins/form/focus-behaviour';
    import inputFieldRootClassesMixin from './mixins/form/root-classes';


    export default {
        components: {
            Actions,
        },
        mixins: [
            bemMixin('form-field'),
            isMounted,
            inputFieldFocusBehaviourMixin,
            inputFieldRootClassesMixin,
        ],
        props: {
            value: {
                type: String,
                required: true,
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
