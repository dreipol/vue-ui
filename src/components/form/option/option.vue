<template>
    <option :value="value">
        <slot>{{ label || value }}</slot>
    </option>
</template>

<script>
    export default {
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
        },
    };
</script>
