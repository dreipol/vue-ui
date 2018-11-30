# vue-ui

Intro

[![Build Status][circleci-image]][circleci-url]
[![Code quality][codeclimate-image]][codeclimate-url]
[![Code coverage][coveralls-image]][coveralls-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

## Purpose
This repo aims to solve all the common ui challenges we have to face in every project.
Custom input fields, carousels, common vuex modules or mixins... are all good candidates
for this package because in this way we can test, improve and document each of them in a
really modular way.

## Installation

This module is simply available on npm

```bash
npm install -S @dreipol/vue-ui
```

## Usage

You can pick any of our modules just by importing them in your project for example:

```js
import { Input as UiInput } from '@dreipol/vue-ui/src/components'

export default {
    components: { UiInput },
    template: `<div><ui-input/></div>`
}
```

If you are using webpack or rollup to compile your js bundle, remember to configure
your all your loaders (vue-loader, babel-loader) in order to compile also the `node_modules/@dreipol/vue-ui` dependencies:
all the code provided in this repo is written in modern javascript and might be transpiled on older browsers.

## Documentation

Each single module has its own documentation, below you can browse the list of all the available modules:

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
