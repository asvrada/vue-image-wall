<template>
    <div id="app" v-bind:style="styleWall" v-on:mouseout="onMouseout">
        <div id="container_images" v-bind:style="styleContainer">
            <image-frame
                    v-for="id in getNumImages"
                    v-bind:key="id"
                    v-bind:id="id - 1"></image-frame>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";

    import ImageFrame from "./ImageFrame";

    import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

    export default {
        name: "ImageWall",
        components: {ImageFrame},
        created() {
            this.init();
        },
        mounted() {
            const self = this;

            // Add listener for window resize event
            window.addEventListener("resize", _.debounce(() => {
                self.onUpdateWidth();
            }, 500));

            // manually trigger the update
            setTimeout(() => {
                self.onUpdateWidth();
            }, 10);
        },
        methods: {
            ...mapMutations([
                'setWidth',
                'setMousePos',
                'setHoverImage'
            ]),
            ...mapActions([
                'init',
                'removeHoverImageDebounce'
            ]),
            onMouseout: function (event) {
                function traverseChildren(elem) {
                    let children = [];
                    let q = [];
                    q.push(elem);

                    while (q.length > 0) {
                        let head = q.pop();
                        children.push(head);
                        for (let i = 0; i < head.children.length; i++) {
                            q.push(head.children[i]);
                        }
                    }

                    return children;
                }

                // room for optimization
                let children = traverseChildren(this.$el);
                const e = event.relatedTarget;

                if (!!~children.indexOf(e)) {
                    return;
                }

                this.setHoverImage(null);
            },
            // Listener for resize event
            onUpdateWidth: function () {
                const newWidth = this.$el.getBoundingClientRect().width;
                if (newWidth === this.width) {
                    return;
                }

                this.setWidth(newWidth);
            }
        },
        computed: {
            ...mapState({
                width: state => state.width,
                pathPrefix: state => state.pathPrefix,
                listImages: state => state.listImages,
                config: state => state.config
            }),
            ...mapGetters([
                'getContainerOffset',
                'getNumImages'
            ]),
            styleWall: function () {
                return {
                    border: `${this.config.border.thickness}px ${this.config.border.color} solid`,
                    "border-radius": `${this.config.radius}px`,
                };
            },
            styleContainer: function () {
                return {
                    left: `-${this.getContainerOffset}px`,
                    height: `${this.config.height}px`
                };
            }
        },
    };
</script>

<style scoped lang="scss">
    #app {
        overflow: hidden;

        #container_images {
            white-space: nowrap;
            position: relative;
        }
    }
</style>