<template>
    <div id="image" v-bind:style="styleDiv">
        <img src="./../assets/test-0.jpg" v-bind:style="styleImg">
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "ImageFrame",
        computed: {
            ...mapState({
                config: state => state.config.imageFrame,
                globalConfig: state => state.config,
            }),
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.config.width}px`,
                    "border-left": `${this.globalConfig.border.thickness / 2}px ${this.globalConfig.border.color} solid`,
                    "border-right": `${this.globalConfig.border.thickness / 2}px ${this.globalConfig.border.color} solid`,
                    "height": `200px`,
                };
            },
            styleImg: function () {
                return {
                    transform: `skew(${this.config.degreeSkew}deg)`,
                    left: `${this.config.offset}px`,
                };
            }
        }
    };
</script>

<style scoped lang="scss">
    #image {
        box-sizing: border-box;
        overflow: hidden;

        display: inline-block;

        img {
            position: relative;
        }
    }
</style>