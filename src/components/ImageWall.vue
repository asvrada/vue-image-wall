<template>
    <div id="app" v-bind:style="styleWall">
        <div id="container_images" v-bind:style="styleContainer">
            <image-frame
                    v-for="id in getNumImages"
                    v-bind:key="id"
                    v-bind:id="id - 1"></image-frame>
        </div>
    </div>
</template>

<script>
  import _ from "lodash";

  import ImageFrame from "./ImageFrame";

  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

  export default {
    name: "ImageWall",
    components: {ImageFrame},
    props: ['listImages'],
    created() {
      this.init(this.listImages);
    },
    mounted() {
      const self = this;

      // Add listener for window resize event
      window.addEventListener("resize", _.debounce(() => {
        self.onUpdateWidth();
      }, 500));

      // manually trigger a update to get the width
      self.onUpdateWidth();
    },
    methods: {
      track() {
        this.$ga.page('/');
      },
      ...mapMutations([
        'setWidth',
        'setMousePos',
        'setHoverImage'
      ]),
      ...mapActions([
        'init',
        'removeHoverImageDebounce'
      ]),
      // Listener for resize event
      onUpdateWidth: function () {
        const newWidth = this.$el.getBoundingClientRect().width;
        if (newWidth === this.width) {
          return;
        }

        this.setWidth(newWidth);
      }
    },
    computed: {
      ...mapState({
        width: state => state.width,
        pathPrefix: state => state.pathPrefix,
        config: state => state.config
      }),
      ...mapGetters([
        'getContainerOffset',
        'getNumImages'
      ]),
      styleWall: function () {
        return {
          border: `${this.config.border.thickness}px ${this.config.border.color} solid`,
          height: `${this.config.height}px`,
          "border-radius": `${this.config.radius}px`,
        };
      },
      styleContainer: function () {
        return {
          left: `-${this.getContainerOffset}px`,
        };
      }
    },
  };
</script>

<style scoped lang="scss">
    #app {
        overflow: hidden;
        box-sizing: border-box;

        #container_images {
            white-space: nowrap;
            position: relative;
        }
    }
</style>