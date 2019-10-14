<template>
    <div id="container" v-bind:style="styleDiv">
        <img alt="Some Image" ref="elementImage" v-bind:src="getImageByID(id)" v-bind:style="styleImg">
    </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from "vuex";

  export default {
    name: "ImageFrame",
    props: ["id"],
    data() {
      return {};
    },
    mounted() {
      const self = this;

      // Added listener for mouse hovering
      this.$el.addEventListener("mouseenter", this.onMouseEnter);
    },
    beforeDestroy() {
      this.$el.removeEventListener("mouseenter", this.onMouseEnter);
    },
    computed: {
      ...mapState({
        widthWindow: state => state.width,
      }),
      ...mapGetters([
        'getWidthByID',
        'getImageByID',
        'getContainerOffset'
      ]),
      ...mapState({
        config: state => state.config,
        duration: state => state.interaction.config.b.duration
      }),
      /**
       * Return a float in range: 0 - 1
       */
      getComputedWidthPercent: function () {
        return this.getWidthByID(this.id);
      },
      getComputedWidthPixel: function () {
        return this.getComputedWidthPercent * this.widthWindow;
      },
      styleDiv: function () {
        return {
          transform: `skew(-${this.config.degreeSkew}deg)`,
          "width": `${this.getComputedWidthPercent * 100}%`,
          "border-right": `${this.config.border.thickness}px ${this.config.border.color} solid`,
          "height": `${this.config.height}px`,
          "transition": `${this.duration}ms ease`,
        };
      },
      styleImg: function () {
        return {
          width: `${this.getComputedWidthPixel + 2 * this.getContainerOffset + 5}px`,
          // left will be based on skew and height
          left: `${-this.getContainerOffset}px`,
          transform: `skew(${this.config.degreeSkew}deg)`,
          "transition": `${this.duration}ms ease`,
        };
      }
    },
    methods: {
      ...mapMutations([
        'setHoverImage'
      ]),
      onMouseEnter: function () {
        // change current hovering image to this id
        this.setHoverImage(this.id);
      },
    }
  };
</script>

<style scoped lang="scss">
    #container {
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