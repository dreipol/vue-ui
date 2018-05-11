import { createConfig } from './create-config';
import module from './module';

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

export default plugin;
