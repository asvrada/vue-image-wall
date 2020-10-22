# vue image wall

[![Build Status](https://travis-ci.com/asvrada/vue-imagewall.svg?branch=master)](https://travis-ci.com/asvrada/vue-imagewall)

An interactive vue component that displays multiple images in a row.

By hovering mouse over one of the images, that image will expand in width.

[Demo](https://asvrada.github.io/rwby-imagewall-demo/)

## Install

```
npm install vue-template-compiler --save-dev
npm install vue-image-wall
```

or

```
yarn add vue-template-compiler -D
yarn add vue-image-wall
```

## Usage
__FEATURES UNDER DEVELOPMENT__

1. Width is fixed to 250px, will be fixed
2. Will add ability to accept config (scale of image, animation duration, etc)

```
<template>
  <div id="app">
    <vue-image-wall v-bind:link-images="listImages"></vue-image-wall>
  </div>
</template>

<script>

  import VueImageWall from 'vue-image-wall';

  export default {
    name: 'app',
    components: { VueImageWall },
    data: function () {
      return {
        listImages: [
          '/assets/0.jpg',
          '/assets/1.jpg',
          '/assets/2.jpg',
          '/assets/3.jpg',
          '/assets/4.jpg'
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
| linkImages | `[String]` | (required) | Contains list of images that this component will display |

## How to Contribute

Any comment/issue/PR is welcome!

## TODO:
1. Add two interaction modes 
    1. macOS dock

## License

[MIT](https://opensource.org/licenses/MIT)
