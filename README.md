# vue-ui

A flexible system of modern ui components for Vue.

[![Build Status][circleci-image]][circleci-url]
[![Code quality][codeclimate-image]][codeclimate-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Purpose
This repo aims to solve common ui challenges within a common web project.
The scope of this package includes custom input fields, ui patterns (such as overlays) as well as their helpers and vuex modules. Within this repo these components can be tested, improved and documented in a modular and controlled way.

## Installation
This package is available via `npm`:

```bash
npm install -S @dreipol/vue-ui
```

## Usage
Pick any of the modules by importing them in your project, for example:

```js
import { UiInput } from '@dreipol/vue-ui/src/components'

export default {
    components: { UiInput },
    template: `<div><ui-input/></div>`
}
```

The code in this repo is based on ES2017 and must be transpiled to support older browsers.
If you are using webpack or rollup to compile your js bundle, remember to configure all loaders 
(vue-loader, babel-loader) to also compile the `node_modules/@dreipol/vue-ui` dependency.

## Documentation
Each module contains its own documentation, you can browse the list of all the available modules:

- [components](/src/components)
- [mixins](/src/mixins)
- [filters](/src/filters)
- [util](/src/util)
- [vuex](/src/vuex)

[circleci-image]: https://circleci.com/gh/dreipol/vue-ui.svg?style=svg
[circleci-url]: https://circleci.com/gh/dreipol/vue-ui
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/@dreipol/vue-ui.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/@dreipol/vue-ui.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@dreipol/vue-ui
[codeclimate-image]: https://api.codeclimate.com/v1/badges/fb8c4a8a6043d9e73f7f/maintainability
[codeclimate-url]: https://codeclimate.com/github/dreipol/vue-ui/maintainability
[coveralls-image]: https://coveralls.io/repos/github/dreipol/vue-ui/badge.svg?branch=develop
[coveralls-url]: https://coveralls.io/github/dreipol/vue-ui?branch=develop
