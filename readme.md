# vue image wall

[![Build Status](https://travis-ci.com/asvrada/vue-imagewall.svg?branch=master)](https://travis-ci.com/asvrada/vue-imagewall)

An interactive vue component that displays multiple images in a row.

By hovering mouse over one of the images, that image will expand in width.

[Demo](https://asvrada.github.io/rwby-imagewall-demo/)

## Install

```
npm install vue-template-compiler --save-dev
npm install vue-imagewall
```

or

```
yarn add vue-template-compiler -D
yarn add vue-imagewall
```

## Usage
__UNDER DEVELOPMENT__

**Component height is fixed to 250px, fix is WIP**

```
<template>
  <div id="app">
    <vue-image-wall v-bind:link-images="listImages"></vue-image-wall>
  </div>
</template>

<script>

  import VueImageWall from 'vue-imagewall';

  export default {
    name: 'app',
    components: { VueImageWall },
    data: function () {
      return {
        'listImages': [
          'https://asvrada.github.io/assets/0.jpg',
          'https://asvrada.github.io/assets/1.jpg',
          'https://asvrada.github.io/assets/2.jpg',
          'https://asvrada.github.io/assets/3.jpg',
          'https://asvrada.github.io/assets/4.jpg'
        ],
      };
    },
  };

</script>

<style scoped>
</style>
```

| props | type | default value | note |
|-----|------|-------|------|
| linkImages | `[String]` | `[]` | Contains list of images in URL (absolute URL) that this component will display |

As I am still learning how to properly publish this project as a npm package, you can't use it yet. Sorry.

Any contribution is welcomed. The GitHub repo for this project is [here](https://github.com/asvrada/vue-imagewall).

## TODO:
2. Add two interaction modes 
    1. macOS dock

## License

[MIT](https://opensource.org/licenses/MIT)
