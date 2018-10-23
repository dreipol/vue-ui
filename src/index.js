import { createConfig } from './create-config';

// TODO: Avoid to export undefined globals, redefined somewhere else
export let GlobalVue;
export let VuexStore;
export let config;

const plugin = {};

plugin.install = function(Vue, presets) {
    if (plugin.installed) { return; }
    plugin.installed = true;

    config = createConfig(presets);

    console.log('hello world');
};

export { default as Modal } from './components/modal/modal.vue';
export { default as Overlay } from './components/overlay/overlay.vue';
export { default as ScrollReveal } from './components/scroll-reveal/scroll-reveal.vue';

export { default as interactionObserverMixin } from './mixins/intersection-observer';

export default plugin;
