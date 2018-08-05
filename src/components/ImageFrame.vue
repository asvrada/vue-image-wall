<template>
    <div id="image" v-bind:style="styleDiv">
        <img src="./../assets/test-0.jpg" v-bind:style="styleImg">
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "ImageFrame",
        data(){
            return {
                width: 100,
                offset: -200,
            };
        },
        computed: {
            ...mapState({
                config: state => state.config,
            }),
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.width}px`,
                    "border-left": `${this.config.border.thickness / 2}px ${this.config.border.color} solid`,
                    "border-right": `${this.config.border.thickness / 2}px ${this.config.border.color} solid`,
                    "height": `${this.config.height}px`,
                };
            },
            styleImg: function () {
                return {
                    transform: `skew(${this.config.degreeSkew}deg)`,
                    left: `${this.offset}px`,
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