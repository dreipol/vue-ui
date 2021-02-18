<template>
  <svg class="ui-icon" tabindex="-1" focusable="false" :class="[rootClasses]">
    <title v-if="hasTitle" v-text="symbol" />
    <use v-bind="{ 'xlink:href': symbolName }" />
  </svg>
</template>

<script>
  import bemMixin from '../../mixins/bem'
  import { settings, USE_ICON_TITLES } from '../../settings'

  const PLACEHOLDER_SYMBOL = 'placeholder'
  const DEFAULT_SYMBOL_SIZE = 'default'

  export default {
    mixins: [bemMixin('ui-icon')],
    props: {
      symbol: {
        type: String,
        default: null,
      },
      size: {
        type: String,
        default: null,
      },
      dynamicSize: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        hasTitle: settings.get(USE_ICON_TITLES),
      }
    },
    computed: {
      rootClasses() {
        return [this.bemIf(!this.dynamicSize, this.size)]
      },
      symbolName() {
        const hasSize = this.size && this.size !== DEFAULT_SYMBOL_SIZE

        if (this.symbol) {
          return `#${hasSize ? `${this.size}--` : ''}${this.symbol}`
        }

        return `#${PLACEHOLDER_SYMBOL}`
      },
    },
  }
</script>
