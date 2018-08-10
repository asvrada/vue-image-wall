<template>
    <div id="imagewall" v-bind:style="styleWall">
        <div id="container_images" v-bind:style="styleContainer">
            <image-frame
                    v-for="id in getNumImages"
                    v-bind:key="id"
                    v-bind:id="id-1"></image-frame>
        </div>
    </div>
</template>

<script>
    import ImageFrame from "./ImageFrame";

    import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

    export default {
        name: "ImageWall",
        components: {ImageFrame},
        created() {
            this.init();
        },
        mounted() {
            // Added on window resize listener
            (function (self) {
                window.addEventListener("resize", self.onUpdateWidth);
            })(this);

            // Added on mouse exit listener
            // (function (self) {
            //     self.$el.addEventListener("mouseout", self.onMouseExit);
            // })(this);

            // Added on mouseover listener
            // (function (self) {
            //     self.$el.addEventListener("mouseover", self.onMouseover);
            // })(this);

            this.onUpdateWidth();
        },
        beforeDestroy() {
            (function (self) {
                window.removeEventListener("resize", self.onUpdateWidth);
            })(this);

            // (function (self) {
            //     self.$el.removeEventListener("mouseout", self.onMouseExit);
            // })(this);

            // (function (self) {
            //     self.$el.removeEventListener("mouseover", self.onMouseover);
            // })(this);
        },
        methods: {
            ...mapMutations([
                'updateWidth',
                'updateMousePos',
                'updateHoverImage'
            ]),
            ...mapActions([
                'init',
                'removeHoverImageDebounce'
            ]),
            onMouseExit: function () {
                // todo
            },
            /**
             * Listener for mouseover event
             * @param event
             * @returns {number} mouse cordinate on X axis
             */
            onMouseover: function (event) {
                this.updateMousePos(event.clientX);
            },
            // Listener for resize event
            onUpdateWidth: function () {
                const newWidth = this.$el.getBoundingClientRect().width;
                if (newWidth === this.width) {
                    return;
                }

                this.updateWidth(newWidth);
            }
        },
        computed: {
            ...mapState({
                width: state => state.width,
                pathPrefix: state => state.pathPrefix,
                listImages: state => state.listImages,
                config: state => state.config
            }),
            ...mapGetters([
                'getContainerOffset',
                'getNumImages'
            ]),
            styleWall: function () {
                return {
                    border: `${this.config.border.thickness}px ${this.config.border.color} solid`,
                    "border-radius": `${this.config.radius}px`,
                };
            },
            styleContainer: function () {
                return {
                    left: `-${this.getContainerOffset}px`,
                    height: `${this.config.height}px`
                };
            }
        },
    };
</script>

<style scoped lang="scss">
    #imagewall {
        overflow: hidden;

        #container_images {
            white-space: nowrap;
            position: relative;
        }
    }
</style>