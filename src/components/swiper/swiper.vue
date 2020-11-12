<template>
    <!-- Slider main container -->
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <slot name="slides"/>
        </div>
        <!-- If we need pagination -->
        <slot name="pagination">
            <div class="swiper-pagination"/>
        </slot>

        <!-- If we need navigation buttons -->
        <slot name="navigation">
            <div class="swiper-button-prev"/>
            <div class="swiper-button-next"/>
        </slot>

        <!-- If we need scrollbar -->
        <slot name="scrollbar">
            <div class="swiper-scrollbar"/>
        </slot>
    </div>
</template>

<script>
    import Swiper from 'swiper';

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
    };

    export default {
        mounted() {
            this.swiper = new Swiper(this.$el, {
                ...DEFAULT_OPTIONS,
                ...this.$attrs,
            });
        },
        beforeDestroy() {
            this.swiper.destroy();
        },
    };
</script>
