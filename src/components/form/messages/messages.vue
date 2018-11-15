<template>
    <!-- eslint-disable vue/no-confusing-v-for-v-if -->
    <div class="form-field-messages" v-if="hasMessages">
        <span class="form-field-messages--message form-field-messages--message__error"
                v-for="(error, errorIdx) in messages.error"
                v-if="hasErrorMessages"
                :key="prefixKey('error', errorIdx)"
                v-html="error"/>
        <span class="form-field-messages--message form-field-messages--message__info"
                v-for="(info, infoIdx) in infoMessages"
                v-if="hasInfoMessages"
                :key="prefixKey('info', infoIdx)"
                v-html="info"/>
    </div>
    <!-- eslint-enable vue/no-confusing-v-for-v-if -->
</template>

<script>
    export default {
        props: {
            /** @type {IFormFieldMessages} */
            messages: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        computed: {
            hasErrorMessages() {
                return Array.isArray(this.messages.error) && !!this.messages.error.length;
            },
            hasInfoMessages() {
                return !!this.infoMessages.length;
            },
            hasMessages() {
                return this.hasErrorMessages || this.hasInfoMessages;
            },
            infoMessages() {
                return [this.messages.info].filter(Boolean);
            },
        },
        methods: {
            prefixKey(type, key) {
                return `${ type }-${ key }`;
            },
        },
    };
</script>
