<script>
  /**
   * We use here JSX in order to be able to loop default slots to create the slider slides
   */
  export default {
    functional: true,
    render(h, { scopedSlots }) {
      return (
        scopedSlots
          .default()
          // use only slots having a root tag
          .filter(({ tag }) => tag)
          .map((slot, i) => {
            return (
              <li class="swiper-slide swiper__slide" key={i}>
                <div class="swiper__item">
                  {h(slot.tag, slot.data, slot.children)}
                </div>
              </li>
            )
          })
      )
    },
  }
</script>
