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

            (function (self) {
                setTimeout(function () {
                    self.offset = self.offsetImage();
                }, self.duation + 20);
            })(this);
        },
        beforeDestroy() {
            (function (self) {
                self.$el.removeEventListener("mouseenter", self.onMouseEnter);
            })(this);
        },
        computed: {
            ...mapGetters([
                'getWidthByID',
                'getImageByID'
            ]),
            ...mapState({
                config: state => state.config,
                duation: state => state.interaction.config.b.duation
            }),
            styleDiv: function () {
                return {
                    transform: `skew(-${this.config.degreeSkew}deg)`,
                    "width": `${this.getWidthByID(this.id) * 100}%`,
                    "border-right": `${this.config.border.thickness}px ${this.config.border.color} solid`,
                    "height": `${this.config.height}px`,
                    "transition": `${this.duation}ms ease`,
                };
            },
            styleImg: function () {
                return {
                    transform: `skew(${this.config.degreeSkew}deg)`,
                    left: `${this.getOffset()}px`,
                    "transition": `${this.duation}ms ease`,
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
            /**
             * Offset of this image
             * This is used to align the image
             * @returns {number}
             */
            getOffset: function () {
                return this.offset;
            },
            offsetImage: function () {
                const widthWindow = this.$el.getBoundingClientRect().width;
                const widthImage = this.imageResolution.x;

                return -((widthImage / 2) - (widthWindow / 2));
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