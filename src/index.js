// global exports
export * as components from './components'
export * as mixins from './mixins'
export * as filters from './filters'
export * as util from './util'
export * as vuex from './vuex'
export * as settings from './settings'

// vuex modules
export { default as uiOverlayVuexModule } from './vuex/modules/overlay'
export { default as uiScrollVuexModule } from './vuex/modules/scroll'

// utils
export { default as isIos } from './util/detect/ios-detect'

// mixins
export { default as scrollMixin } from './mixins/scroll'
export { default as uuidMixin } from './mixins/uuid'
export { default as scrollLockHelperMixin } from './mixins/scroll-lock-helper'
export { default as isMountedMixin } from './mixins/is-mounted'
export { default as intersectionObserverMixin } from './mixins/intersection-observer'
export { default as bemMixin } from './mixins/bem'

// filters
export { default as srcsetFilter } from './filters/srcset'
export { default as backgrundImageFilter } from './filters/background-image'

// components
export { default as UiOverlay } from './components/overlay/overlay.vue'
export { default as UiScrollReveal } from './components/scroll-reveal/scroll-reveal.vue'
export { default as UiIntersectionObserver } from './components/intersection-observer/intersection-observer.vue'
export { default as UiIcon } from './components/icon/icon.vue'
export { default as UiAccordion } from './components/accordion/accordion.vue'
export { default as UITabs } from './components/tabs/tabs.vue'
// form components
export { default as UiInput } from './components/form/input/input.vue'
export { default as UiTextarea } from './components/form/textarea/textarea.vue'
export { default as UiCheckbox } from './components/form/checkbox/checkbox.vue'
export { default as UiRadio } from './components/form/radio/radio.vue'
export { default as UiHidden } from './components/form/hidden/hidden.vue'
export { default as UiOptgroup } from './components/form/optgroup/optgroup.vue'
export { default as UiOption } from './components/form/option/option.vue'
export { default as UiSelect } from './components/form/select/select.vue'
export { default as UiModelProvider } from './components/form/model-provider/model-provider.vue'
