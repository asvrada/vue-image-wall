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

    import {mapState} from "vuex";

    // 600 x 200
    export default {
        name: "ImageWall",
        components: {ImageFrame},
        computed: {
            ...mapState({
                pathPrefix: state => state.pathPrefix,
                listImages: state => state.listImages,
                config: state => state.config
            }),
            styleWall: function () {
                return {
                    border: `${this.config.border.thickness}px ${this.config.border.color} solid`,
                    "border-radius": `${this.config.radius}px`,
                };
            },
            styleContainer: function () {
                return {
                    left: `${this.config.offset}px`,
                    height: `${this.config.height}px`
                };
            }
        }
    };
</script>

<style scoped lang="scss">
    #imagewall {
        overflow: hidden;
        #container_images {
            white-space: nowrap;
            box-sizing: border-box;
            position: relative;
        }
    }
</style>