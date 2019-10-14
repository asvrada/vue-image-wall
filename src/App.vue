<template>
    <div id="app">
        <image-wall v-bind:list-images="this.listImages"></image-wall>
    </div>
</template>

<script>
  import ImageWall from "./components/ImageWall";

  export default {
    name: 'app',
    components: {ImageWall},
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
        'listImages': absolutePath
      };
    }
  };

</script>

<style scoped>
</style>
