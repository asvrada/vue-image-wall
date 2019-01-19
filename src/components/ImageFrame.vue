<template>
    <div id="container" v-bind:style="styleDiv">
        <img alt="Some Image" ref="elementImage" v-bind:src="getImageByID(id)" v-bind:style="styleImg">
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from "vuex";

    export default {
        name: "ImageFrame",
        props: ["id"],
        data() {
            return {
                // default resolution
                imageResolution: {
                    x: 100,
                    y: 100
                },
                offset: -250,
            };
        },
        mounted() {
            const self = this;

            // Added listener for mouse hovering
            this.$el.addEventListener("mouseenter", this.onMouseEnter);

            // Image onload
            // update the dimension of the image
            const ref = self.$refs.elementImage;
            ref.addEventListener("load", () => {
                self.imageResolution.x = ref.width;
                self.imageResolution.y = ref.height;
                self.$forceUpdate();
            });
        },
        updated() {
            // center the image
            this.offset = this.calculateOffset();
        },
        beforeDestroy() {
            this.$el.removeEventListener("mouseenter", this.onMouseEnter);
        },
        computed: {
            ...mapState({
                widthWindow: state => state.width,
            }),
            ...mapGetters([
                'getWidthByID',
                'getImageByID'
            ]),
            ...mapState({
                config: state => state.config,
                duration: state => state.interaction.config.b.duration
            }),
            /**
             * Range: 0 - 1
             * @returns {*|(function(*): number)}
             */
            getComputedWidthPercent: function () {
                return this.getWidthByID(this.id);
            },
            getComputedWidthPixel: function () {
                return this.getComputedWidthPercent * this.widthWindow;
            },
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.getComputedWidthPercent * 100}%`,
                    "border-right": `${this.config.border.thickness}px ${this.config.border.color} solid`,
                    "height": `${this.config.height}px`,
                    "transition": `${this.duration}ms ease`,
                };
            },
            styleImg: function () {
                return {
                    transform: `skew(${this.config.degreeSkew}deg)`,
                    left: `${this.offset}px`,
                    "transition": `${this.duration}ms ease`,
                };
            }
        },
        methods: {
            ...mapMutations([
                'setHoverImage'
            ]),
            onMouseEnter: function () {
                // change current hovering image to this id
                this.setHoverImage(this.id);
            },
            calculateOffset: function () {
                const widthFrame = this.getComputedWidthPixel;
                const widthImage = this.imageResolution.x;

                return -((widthImage / 2) - (widthFrame / 2));
            }
        }
    };
</script>

<style scoped lang="scss">
    #container {

        box-sizing: border-box;
        overflow: hidden;

        display: inline-block;

        img {
            display: inline-block;
            position: relative;
        }
    }
</style>