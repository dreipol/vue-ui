import { createConfig } from './create-config';
import modules from './modules';

// TODO: Avoid to export undefined globals, redefined somewhere else
export let GlobalVue;
export let VuexStore;
export let config;

const plugin = {};

plugin.install = function(Vue, presets) {
    if (plugin.installed) { return; }
    plugin.installed = true;

    config = createConfig(presets);

    GlobalVue = Vue;
    Vue.$vueUi = { connect };
};

export { default as Modal } from './components/modal/modal.vue';
export { default as Overlay } from './components/overlay/overlay.vue';
export { default as ScrollReveal } from './components/scroll-reveal/scroll-reveal.vue';
export { default as IntersectionObserverComponent } from './components/intersection-observer/intersection-observer.vue';

export { default as scrollMixin } from './modules/scroll/mixin';
export { default as interactionObserverMixin } from './mixins/intersection-observer';

export default plugin;

/**
 * Wire up a vuex store with the app
 * @access public
 * @param {object} store - A vuex store containing the `router` module
 * @return {function} Unsync function
 */
function connect(store) {
    VuexStore = store;

    // Register all vuex modules
    VuexStore.registerModule('vue-ui', { namespaced: true });
    VuexStore.registerModule(['vue-ui', 'overlay'], modules.overlay);
    VuexStore.registerModule(['vue-ui', 'scroll'], modules.scroll);

    return () => {
        VuexStore.unregisterModule('vue-ui');
        VuexStore.registerModule(['vue-ui', 'overlay']);
        VuexStore.registerModule(['vue-ui', 'scroll']);
    };
}
