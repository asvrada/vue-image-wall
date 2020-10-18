<template>
  <div id="image-frame" v-bind:style="styleDiv">
    <img alt="Some Image" ref="elementImage" v-bind:src="propLinkImages[propId]" v-bind:style="styleImg">
  </div>
</template>

<script>
  export default {
    name: 'ImageFrame',
    props: [
      'propLinkImages',
      'propId',
      'propConfigGeneral',
      'propConfigMode',

      'propRuntimeVariable',

      'propGetContainerOffset',
      'propImageFrameWidthPercentage',
    ],
    mounted() {
      // Added listener for mouse hovering
      this.$el.addEventListener('mouseenter', this.onMouseEnter);
    },
    beforeDestroy() {
      this.$el.removeEventListener('mouseenter', this.onMouseEnter);
    },
    computed: {
      /**
       * Return a float in range: 0 - 1
       */
      getComputedWidthPixel: function () {
        return this.propImageFrameWidthPercentage * this.propRuntimeVariable.width;
      },
      styleDiv: function () {
        return {
          transform: `skew(-${this.propConfigGeneral.degreeSkew}deg)`,
          'width': `${this.propImageFrameWidthPercentage * 100}%`,
          'border-right': `${this.propConfigGeneral.border.thickness}px ${this.propConfigGeneral.border.color} solid`,
          'height': `${this.propConfigGeneral.height}px`,
          'transition': `${this.propConfigMode.duration}ms ease`,
        };
      },
      styleImg: function () {
        return {
          width: `${this.getComputedWidthPixel + 2 * this.propGetContainerOffset + 5}px`,
          // left will be based on skew and height
          left: `${-this.propGetContainerOffset}px`,
          transform: `skew(${this.propConfigGeneral.degreeSkew}deg)`,
          transition: `${this.propConfigMode.duration}ms ease`,
        };
      },
    },
    methods: {
      onMouseEnter: function () {
        // change current hovering image to this id
        this.$emit('setHoverImage', this.propId);
      },
    },
  };
</script>

<style scoped lang="scss">
  #image-frame {
    box-sizing: content-box;
    overflow: hidden;

    display: inline-block;

    img {
      display: block;
      position: relative;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
</style>