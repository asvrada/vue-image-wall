<template>
  <div id="image-wall" v-bind:style="styleWall">
    <div id="container_images" v-bind:style="styleContainer">
      <image-frame
        v-for="id in propListImages.length"
        v-bind:key="id"

        v-bind:prop-link-images="propListImages"

        v-bind:prop-id="id - 1"
        v-bind:prop-config-mode="propConfigMode"
        v-bind:prop-config-general="propConfigGeneral"

        v-bind:prop-runtime-variable="propRuntimeVariable"

        v-bind:prop-get-container-offset="propGetContainerOffset"
        v-bind:prop-image-frame-width-percentage="propImageFrameWidthsPercentage[id - 1]"

        @setHoverImage="handleSetHoverImage"
      ></image-frame>
    </div>
  </div>
</template>

<script>
  import ImageFrame from './ImageFrame.vue';

  export default {
    name: 'ImageWall',
    components: { ImageFrame },
    props: [
      'propListImages',
      'propConfigMode',
      'propConfigGeneral',

      'propRuntimeVariable',

      // getter from previous vuex store
      'propGetContainerOffset',
      'propImageFrameWidthsPercentage',
    ],
    methods: {
      handleSetHoverImage: function (id) {
        this.$emit('setHoverImage', id);
      },
    },
    computed: {
      styleWall: function () {
        return {
          border: `${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,
          height: `${this.propConfigGeneral.height}px`, 'border-radius': `${this.propConfigGeneral.radius}px`,
        };
      },
      styleContainer: function () {
        return {
          left: `-${this.propGetContainerOffset}px`,
        };
      },
    },
  };
</script>

<style scoped lang="scss">
  #image-wall {
    overflow: hidden;
    box-sizing: border-box;

    #container_images {
      white-space: nowrap;
      position: relative;
    }
  }
</style>