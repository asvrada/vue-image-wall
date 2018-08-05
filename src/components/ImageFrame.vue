<template>
    <div id="image" v-bind:style="styleDiv">
        <img src="./../assets/test-0.jpg" v-bind:style="styleImg">
    </div>
</template>

<script>
    export default {
        name: "ImageFrame",
        props: ["border", "height", "image"],
        data() {
            return {
                width: 100,
                offset: -200,
                degreeSkew: 15,
            };
        },
        computed: {
            styleDiv: function() {
                return {
                    transform: `skew(-${this.degreeSkew}deg)`,
                    "width": `${this.width}px`,
                    // todo: props
                    "border-left": "2px orange solid",
                    "border-right": "2px orange solid",
                    "height": `200px`,
                };
            },
            styleImg: function() {
                return {
                   transform: `skew(${this.degreeSkew}deg)`,
                   left: `${this.offset}px`,
                };
            }
        }
    };
</script>

<style scoped lang="scss">
    /*
    Comment out attributes are controlled by JS
    */
    #image {
        box-sizing: border-box;
        overflow: hidden;

        display: inline-block;

        img {
            position: relative;
        }
    }
</style>