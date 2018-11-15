<template>
    <optgroup :label="label">
        <slot></slot>
    </optgroup>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                required: true,
            },
        },
    };
</script>
