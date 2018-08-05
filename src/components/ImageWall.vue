<template>
    <div id="imagewall" v-bind:style="styleWall">
        <div id="container_images" v-bind:style="styleContainer">
            <image-frame></image-frame>
            <image-frame></image-frame>
            <image-frame></image-frame>
            <image-frame></image-frame>
        </div>
    </div>
</template>

<script>
    import ImageFrame from "./ImageFrame";

    import {mapState, mapGetters, mapMutations} from "vuex";

    export default {
        name: "ImageWall",
        components: {ImageFrame},
        mounted() {
            (function (self) {
                window.addEventListener("resize", self.onUpdateWidth);
            })(this);
            this.onUpdateWidth();
        },
        beforeDestroy() {
            (function (self) {
                window.removeEventListener("resize", self.onUpdateWidth);
            })(this);
        },
        methods: {
            ...mapMutations([
                'updateWidth'
            ]),
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
                width: state => state.config.width,
                pathPrefix: state => state.pathPrefix,
                listImages: state => state.listImages,
                config: state => state.config
            }),
            ...mapGetters([
                'getContainerOffset'
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