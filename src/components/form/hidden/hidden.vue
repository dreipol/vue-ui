<template>
  <input type="hidden" :value="value" v-bind="$attrs" />
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        required: true,
      },
    },
  }
</script>
