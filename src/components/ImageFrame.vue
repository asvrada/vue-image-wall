<template>
    <div id="image" v-bind:style="styleDiv">
        <img v-bind:src="getImageByID(id)" v-bind:style="styleImg">
    </div>
</template>

<script>
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "ImageFrame",
        props: ["id"],
        data() {
            return {};
        },
        computed: {
            ...mapGetters([
                'getWidthByID',
                'getImageByID'
            ]),
            ...mapState({
                config: state => state.config,
            }),
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.getWidthByID(this.id) * 100}%`,
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
            /**
             * Offset of this image
             * This is used to align the image
             * @returns {number}
             */
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