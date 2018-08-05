<template>
    <div id="image" v-bind:style="styleDiv">
        <img src="./../assets/test-8.jpg" v-bind:style="styleImg">
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "ImageFrame",
        data() {
            return {};
        },
        computed: {
            ...mapGetters([
                'getWidthByID',
            ]),
            ...mapState({
                config: state => state.config,
            }),
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.getWidthByID(0) * 100}%`,
                    "border-left": `${this.config.border.thickness / 2}px ${this.config.border.color} solid`,
                    "border-right": `${this.config.border.thickness / 2}px ${this.config.border.color} solid`,
                    "height": `${this.config.height}px`,
                };
            },
            styleImg: function () {
                return {
                    transform: `skew(${this.config.degreeSkew}deg)`,
                    left: `${this.getOffset()}px`,
                };
            }
        },
        methods: {
            getOffset: function () {
                return -250;
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