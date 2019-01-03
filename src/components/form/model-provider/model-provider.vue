<script>
    // check whether an input is a of kind toggle
    const isToggle = target => target.getAttribute('type') === 'checkbox';

    export default {
        props: {
            value: {
                type: [String, Number, Array, Boolean],
                required: true,
            },
        },
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(model) {
                    this.$emit('input', model);
                },
            },
        },
        methods: {
            updateValue({ target }) {
                if (isToggle(target)) {
                    this.updateToggle(target);
                } else {
                    this.model = target.value;
                }
            },
            updateValueRaw(value) {
                this.model = value;
            },
            updateToggle({ checked, value }) {
                if (typeof this.value === 'boolean') {
                    this.model = checked;
                } else if (Array.isArray(this.model)) {
                    if (!value) {
                        throw new Error('Model could not be updated. There was no value attribute set on the input');
                    }

                    this[checked ? 'addItem' : 'removeItem'](value);
                } else {
                    throw new Error('Model could not be updated. Only boolean or arrays are supported');
                }
            },
            hasItem(item) {
                return this.model.includes(item);
            },
            addItem(item) {
                if (!this.hasItem(item)) {
                    this.model.push(item);
                }
            },
            removeItem(item) {
                if (this.hasItem(item)) {
                    this.model.splice(this.value.indexOf(item), 1);
                }
            },
        },
        render() {
            return this.$scopedSlots.default({
                value: this.value,
                updateValue: this.updateValue,
                updateValueRaw: this.updateValueRaw,
                updateToggle: this.updateToggle,
                hasItem: this.hasItem,
                addItem: this.addItem,
                removeItem: this.removeItem,
            });
        },
    };
</script>
