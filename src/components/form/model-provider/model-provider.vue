<script>
    // check whether an input is a of kind toggle
    const isToggle = target => ['checkbox', 'radio'].includes(target.getAttribute('type'));

    export default {
        props: {
            value: {
                type: [String, Number, Array, Boolean],
                required: true,
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
            updateToggle({ checked, value }) {
                if (typeof this.value === 'boolean') {
                    this.model = checked;
                } else if (Array.isArray(this.model)) {
                    this[checked ? 'addItem' : 'removeItem'](value);
                } else {
                    throw new Error('I was unable to update the model. Only boolean or arrays are supported');
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
        render() {
            return this.$scopedSlots.default({
                value: this.value,
                updateValue: this.updateValue,
                updateToggle: this.updateToggle,
                hasItem: this.hasItem,
                addItem: this.addItem,
                removeItem: this.removeItem,
            });
        },
    };
</script>
