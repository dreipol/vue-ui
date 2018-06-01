require('jsdom-global')();

const Vue = require('vue');
const Vuex = require('vuex');
const VueOverlay = require('../dist');
const noop = () => {};

Vue.use(VueOverlay.default, { log: noop });

global.assert = require('assert');
global.Vue = require('vue');
global.store = new Vuex.Store({});

Vue.config.devtools = false;
Vue.config.productionTip = false;

describe('vue-ui', () => {
});
