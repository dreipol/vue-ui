<template>
    <svg class="icon"
            tabindex="-1"
            focusable="false"
            :class="[rootClasses]">
        <title v-text="symbol"/>
        <use v-bind="{ 'xlink:href': symbolName }"/>
    </svg>
</template>

<script>
    import bemMixin from 'mixins/bem';

    const PLACEHOLDER_SYMBOL = 'placeholder';
    const DEFAULT_SYMBOL_SIZE = 'default';

    export default {
        mixins: [
            bemMixin('icon'),
        ],
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
        computed: {
            rootClasses() {
                return [
                    this.bemIf(!this.dynamicSize, this.size),
                ];
            },
            symbolName() {
                const hasSize = this.size && this.size !== DEFAULT_SYMBOL_SIZE;

                if (this.symbol) {
                    return `#${ hasSize ? `${ this.size }--` : '' }${ this.symbol }`;
                }

                return `#${ PLACEHOLDER_SYMBOL }`;
            },
        },
    };
</script>
