<template>
    <div id="imagewall">
        <div id="container_images">
            <div class="container_image">
                <img src="./../assets/test-0.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-1.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-2.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-3.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-4.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-5.jpg">
            </div>
            <div class="container_image">
                <img src="./../assets/test-6.jpg">
            </div>
        </div>
    </div>
</template>

<script>
    // 600 x 200
    export default {
        name: "ImageWall"
    };
</script>

<style scoped lang="scss">
    #imagewall {
        overflow: hidden;
        border: 4px orange solid;
        border-radius: 30px;

        width: 640px;
        #container_images {
            white-space: nowrap;
            box-sizing: border-box;
            position: relative;
            left: -30px;

            height: 200px;
            .container_image {
                box-sizing: border-box;
                overflow: hidden;
                transform: skew(-15deg);

                width: 100px;
                height: 200px;

                border-top: 0;
                border-bottom: 0;
                border-left: 2px orange solid;
                border-right: 2px orange solid;

                display: inline-block;

                img {
                    position: relative;
                    /*align center*/
                    left: -25px - 250px;

                    transform: skew(15deg);
                }
            }
        }
    }
</style>