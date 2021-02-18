<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <ul class="swiper-wrapper">
      <!-- Slides -->
      <swiper-slides :has-lazy-loading="options && options.lazy">
        <slot />
      </swiper-slides>
    </ul>
    <!-- If we need pagination -->
    <slot name="pagination">
      <div class="swiper-pagination" />
    </slot>

    <!-- If we need navigation buttons -->
    <slot name="navigation">
      <div class="swiper-button-prev" />
      <div class="swiper-button-next" />
    </slot>

    <!-- If we need scrollbar -->
    <slot name="scrollbar">
      <div class="swiper-scrollbar" />
    </slot>
  </div>
</template>

<script>
  import Swiper, { Pagination, Lazy } from 'swiper'
  import SwiperSlides from './swiper-slides.vue'
  import SWIPER_EVENTS from './swiper-events'

  Swiper.use([Pagination, Lazy])

  const DEFAULT_OPTIONS = {
    simulateTouch: false,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  }

  export default {
    components: { SwiperSlides },
    props: {
      slides: {
        type: Array,
        default: () => [],
      },
      options: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.swiper = new Swiper(this.$el, {
        ...DEFAULT_OPTIONS,
        ...this.$attrs,
      })

      // bind all the swiper events
      SWIPER_EVENTS.forEach((event) => {
        this.swiper.on(event, (...args) => this.$emit(event, ...args))
      })
    },
    beforeDestroy() {
      this.swiper.destroy()
      this.swiper = null
    },
  }
</script>
