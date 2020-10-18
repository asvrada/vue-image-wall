<template>
  <div id="image-wall-wrapper">
    <image-wall
      v-bind:prop-list-images="linkImages"
      v-bind:prop-config-mode="config[config.mode]"
      v-bind:prop-config-general="config.general"

      v-bind:prop-runtime-variable="runtimeVariables"
      v-bind:prop-get-container-offset="getContainerOffset"
      v-bind:prop-image-frame-widths-percentage="getImageFrameWidthsPercentage"

      @setHoverImage="handleSetHoverImage"
    ></image-wall>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { degreeToRad } from '../helper';
  import ImageWall from './ImageWall';

  /**
   * This wrapper contain all the configuration for Image Wall component
   */
  export default {
    name: 'ImageWallWrapper',
    components: { ImageWall },
    props: ['linkImages'],
    mounted() {
      const vm = this;

      // Add listener for window resize event
      window.addEventListener('resize', _.debounce(() => {
        vm.onWindowResize();
      }, 500));

      // manually trigger a update to get the width
      vm.onWindowResize();
    },
    data: function () {
      return {
        runtimeVariables: {
          /**
           * id of the image that mousing is hovering over now
           */
          hovering: null,
          /**
           * X position of the mouse/cursor
           * Read only
           */
          mouseX: 1,
          /**
           * Read only
           * Width of this entire component (image wall)
           */
          width: 0,
        },
        config: {
          general: {
            // corner radius
            radius: 30,
            // height of wrapper component
            height: 200,
            // degree of skew for images
            degreeSkew: 15,
            border: {
              thickness: 2,
              color: 'orange',
            },
          },
          /**
           * TODO: Mode a: apple macOS docker style
           * Mode b: Image current cursor hovering over enlarges, other images shrinks
           */
          mode: 'b',
          // For mode B
          b: {
            // How much bigger will the hovering image be than others
            scale: 3,
            // duration of transition animation
            duration: 250,
          },

        },
      };
    },
    methods: {
      // Listener for resize event
      onWindowResize: function () {
        const newWidth = this.$el.getBoundingClientRect().width;
        if (newWidth === this.width) {
          return;
        }

        this.runtimeVariables.width = newWidth;
      },
      getWidthPercentageByID: function (id) {
        let callback = null;

        const vm = this;
        const mode = this.config.mode;
        switch (mode) {
          case 'b':
            callback = vm.getWidthPercentageByIDModeB;
            break;
          default:
            throw 'Error: Invalid mode: ' + mode;
        }

        return callback(id);
      },
      getWidthPercentageByIDModeB: function (id) {
        const length = this.linkImages.length;

        // Before width is inited, which will be 1, return 1 / N
        // where N is the number of images
        if (this.runtimeVariables.width === 0) {
          return 1 / length;
        }

        // Total width of this component, to account for the width lost with skewed images on both ends
        const relativeTotalWidth = 1 + (this.config.general.height * this.getTan / this.runtimeVariables.width);

        // width, in percentage, of each images
        const width = 1 / length;

        // above width taken skew into account
        const relativeWidth = relativeTotalWidth / length;

        // id of the image currently hovering over
        const curHovering = this.runtimeVariables.hovering;
        if (curHovering === null) {
          return relativeWidth;
        }

        const scale = this.config.b.scale;

        if (curHovering === id) {
          return relativeWidth * scale;
        } else {
          return relativeWidth * ((1 - scale * width) / ((length - 1) * width));
        }
      },
      handleSetHoverImage: function (id) {
        this.runtimeVariables.hovering = id;
      },
    },
    computed: {
      getTan: function () {
        return Math.tan(degreeToRad(this.config.general.degreeSkew));
      },
      getContainerOffset: function () {
        return this.config.general.height / 2 * this.getTan;
      },
      getImageFrameWidthsPercentage: function () {
        let ans = [];

        for (let i = 0; i < this.linkImages.length; i++) {
          ans.push(this.getWidthPercentageByID(i));
        }

        return ans;
      },
    },
  };
</script>

<style scoped>

</style>