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
            this.offset = this.offsetImage();
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
                // todo: how to get this?
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