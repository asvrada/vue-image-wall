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

    // 600 x 200
    export default {
        name: "ImageWall",
        components: {ImageFrame},
        data() {
            return {
                pathPrefix: "",
                listImaes: [],
                config: {
                    radius: 30,
                    height: 200,
                    maxNumberImage: 10,
                    offset: -30,
                    border: {
                        thickness: 4,
                        color: "orange"
                    }
                }
            };
        },
        computed: {
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