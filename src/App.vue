<template>
  <div id="app">
    <image-wall-wrapper v-bind:link-images="this.listImages"></image-wall-wrapper>
  </div>
</template>

<script>

  import ImageWallWrapper from './components/ImageWallWrapper';
  export default {
    name: 'app',
    components: { ImageWallWrapper },
    data: function () {
      const base = 'https://asvrada.github.io/assets/';
      let listImages = [
        '0.jpg',
        '1.png',
        '2.jpg',
        '3.png',
        '4.jpg',
        '5.png',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
      ];

      let absolutePath = [];
      for (let i in listImages) {
        absolutePath.push(base + listImages[i]);
      }
      return {
        'listImages': absolutePath,
      };
    },
  };

</script>

<style scoped>
</style>
