<template>
  <div class="ui-overlay" :class="rootClasses">
    <transition
      mode="out-in"
      :name="overlay.transition"
      @enter="onEnterHook"
      @after-enter="onAfterEnterHook"
      @after-leave="onAfterLeaveHook"
    >
      <div
        class="ui-overlay__root"
        v-if="overlay.isOpen"
        :key="overlay.timestamp"
      >
        <div class="ui-overlay__backdrop" />
        <div class="ui-overlay__display">
          <div class="ui-overlay__wrap-outer" :style="overlayScrollLockStyles">
            <div class="ui-overlay__wrap-inner">
              <div
                class="ui-overlay__backdrop-click-area"
                @click.prevent="closeOverlay({ id })"
              />
              <div class="ui-overlay__container">
                <div class="ui-overlay__revealer">
                  <component
                    class="ui-overlay__component"
                    v-bind="overlay.props"
                    :is="overlay.component"
                    @close="closeOverlay({ id })"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import bemMixin from '../../mixins/bem'
  import scrollLockHelperMixin from '../../mixins/scroll-lock-helper'

  export default {
    mixins: [bemMixin('ui-overlay'), scrollLockHelperMixin],
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        hasDisabledScroll: null,
        autoCloseTimeout: null,
      }
    },
    computed: {
      ...mapState('vue-ui/overlay', ['overlays']),
      ...mapGetters('vue-ui/overlay', ['hasScrollLockingOverlays']),
      rootClasses() {
        const facets = this.overlay.facets || []
        return facets.map((facet) => this.bemAdd(facet))
      },
      overlay() {
        return this.overlays[this.id] || {}
      },
      overlayScrollLockStyles() {
        return this.hasDisabledScroll ? {} : this.scrollLockStyles
      },
    },
    methods: {
      ...mapActions('vue-ui/scroll', ['disableScroll']),
      ...mapActions('vue-ui/overlay', ['closeOverlay', 'unmountOverlay']),
      setAutoClose() {
        const { autoClose, id } = this.overlay

        clearTimeout(this.autoCloseTimeout)

        if (!autoClose) {
          return
        }

        this.autoCloseTimeout = setTimeout(() => {
          this.closeOverlay({ id, ...autoClose })
        }, autoClose.delay || 0)
      },
      onEnterHook() {
        this.hasDisabledScroll = this.overlay.disableScroll
        if (this.overlay.disableScroll) {
          this.disableScroll({ isLocked: true })
        }
      },
      onAfterEnterHook() {
        this.setAutoClose()
      },
      onAfterLeaveHook() {
        if (!this.overlay.isOpen) {
          this.unmountOverlay(this.overlay)
        }

        if (!this.hasScrollLockingOverlays) {
          this.disableScroll({ isLocked: false })
        }
      },
    },
  }
</script>
