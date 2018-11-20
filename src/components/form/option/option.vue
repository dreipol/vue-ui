<template>
    <option :value="value">
        <slot/>
    </option>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default() {
                    return null;
                },
            },
        },
    };
</script>
