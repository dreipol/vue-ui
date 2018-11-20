<template>
    <div class="form-field form-field__bool form-field__radio"
            :class="[...rootClasses, bemIf(value, 'is-checked')]">
        <label>
            <input type="radio"
                    class="form-field--input"
                    :value="value"
                    v-bind="$attrs"
                    @change="onChange"
                    v-on="$listeners"
            >
            <div class="form-field--label-wrap">
                <span class="form-field--box">
                    <slot mame="icon">
                        <ui-icon class="form-field--box-icon" symbol="checkmark" size="small"/>
                    </slot>
                </span>
                <div class="form-field--label">
                    <slot name="label"/>
                </div>
            </div>
        </label>
        <slot name="messages"/>
    </div>
</template>

<script>
    import bemMixin from 'mixins/bem';
    import rootClassesMixin from 'mixins/form/root-classes';
    import isCheckedMixin from 'mixins/form/is-checked';
    import UiIcon from 'components/icon/icon.vue';

    export default {
        components: {
            UiIcon,
        },
        mixins: [
            bemMixin('form-field'),
            rootClassesMixin,
            isCheckedMixin,
        ],
        props: {
            value: {
                type: String,
                required: true,
            },
        },
    };
</script>
