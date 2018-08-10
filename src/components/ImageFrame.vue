<template>
    <div id="image" v-bind:style="styleDiv">
        <img ref="elementImage" v-bind:src="getImageByID(id)" v-bind:style="styleImg">
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
            // Added listener for mouse hovering
            (function (self) {
                self.$el.addEventListener("mouseenter", self.onMouseEnter);
            })(this);

            // Image onload
            (function (self) {
                const ref = self.$refs.elementImage;
                ref.addEventListener("load", () => {
                    self.imageResolution.x = ref.width;
                    self.imageResolution.y = ref.height;
                    self.$forceUpdate();
                });
            })(this);
        },
        updated() {
            // center the image
            this.offset = this.calculateOffset();
        },
        beforeDestroy() {
            (function (self) {
                self.$el.removeEventListener("mouseenter", self.onMouseEnter);
            })(this);
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
            getComputedWidthPrecent: function () {
                return this.getWidthByID(this.id);
            },
            getComputedWidthPixel: function () {
                return this.getComputedWidthPrecent * this.widthWindow;
            },
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.getComputedWidthPrecent * 100}%`,
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
                'updateHoverImage'
            ]),
            onMouseEnter: function () {
                // change current hovering image to this id
                this.updateHoverImage(this.id);
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
    #image {
        box-sizing: border-box;
        overflow: hidden;

        display: inline-block;

        img {
            position: relative;
        }
    }
</style>