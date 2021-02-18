<script>
  import intersectionObserverMixin from '../../mixins/intersection-observer'

  export default {
    mixins: [intersectionObserverMixin],

    props: {
      thresholdMin: {
        type: Number,
        default: 0.1,
      },
      thresholdMax: {
        type: Number,
        default: null,
      },
    },

    methods: {
      onIntersect(isIntersecting, entry) {
        this.$emit('intersect', { isIntersecting, entry })
      },

      onIntersectEnter(entry) {
        this.$emit('intersect-enter', { entry })
      },

      onIntersectLeave(entry) {
        this.$emit('intersect-leave', { entry })
      },
    },

    mounted() {
      this.registerObserver(this.$el, this.thresholdMin, this.thresholdMax)
    },

    render(createElement) {
      return createElement('div', {}, this.$scopedSlots.default())
    },
  }
</script>
