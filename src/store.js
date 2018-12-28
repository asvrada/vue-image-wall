import Vue from "vue";
import Vuex from "vuex";
import gaussian from "gaussian";

import {degreeToRad} from "./helper";


Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        listImages: [
            "assets/test-1.jpg",
            "assets/test-2.jpg",
            "assets/test-3.jpg",
            "assets/test-4.jpg",
            "assets/test-5.jpg",
            "assets/test-6.jpg",
            "assets/test-7.jpg",
            "assets/test-8.jpg",
        ],
        /**
         * Read only
         * Width of the entire component
         */
        width: 1,
        interaction: {
            /**
             * a: apple macOS docker style
             * b: normal
             */
            mode: "b",
            /**
             * id of the image that mousing is hovering over now
             */
            hovering: null,
            /**
             * X position of the mouse/cursor
             * Read only
             */
            mouseX: 1,
            config: {
                a: {
                    distribution: null,
                    variance: 0
                },
                b: {
                    scale: 3,
                    duration: 500
                }
            },
        },
        config: {
            radius: 30,
            height: 200,
            maxNumberImage: 10,
            degreeSkew: 15,
            border: {
                thickness: 2,
                color: "orange"
            },
        },
    },
    getters: {
        tan: (state) => {
            return Math.tan(degreeToRad(state.config.degreeSkew));
        },
        getMousePoxByPercent: (state) => {
            return state.interaction.mouseX / state.width;
        },
        getNumImages: (state) => {
            return state.listImages.length;
        },
        getImageByID: (state) => (id) => {
            return state.listImages[id];
        },
        getContainerOffset: (state, getters) => {
            return state.config.height / 2 * getters.tan;
        },
        getDistributionByID: (state) => (x) => {
            return state.interaction.distribution.cdf(x) - state.interaction.distribution.cdf(x - 1);
        },
        /**
         * 获取某 id 的图片的宽度
         *
         * @return {function(*): number} 宽度的百分比表示
         */
        getWidthByID: (state, getters) => (id) => {
            let callback = null;

            const mode = state.interaction.mode;
            switch (mode) {
                case "a":
                    callback = getters.getWidthByIDModeA;
                    break;
                case "b":
                    callback = getters.getWidthByIDModeB;
                    break;
                default:
                    throw "Error: Invalid mode: " + id;
            }

            return callback(id);
        },
        /**
         * 获取A模式下的单个图像的宽度，以百分比表示
         *
         * @returns {function(*): number}
         */
        getWidthByIDModeA: (state, getters) => (id) => {
            // todo
            return 0.1;
        },
        /**
         * 获取 B 模式下单个图像的宽度
         */
        getWidthByIDModeB: (state, getters) => (id) => {
            const length = state.listImages.length;
            const relativeTotalWidth = 1 + (state.config.height * getters.tan / state.width);
            const width = 1 / length;
            const relativeWidth = relativeTotalWidth / length;
            const curHovering = state.interaction.hovering;
            const scale = state.interaction.config.b.scale;

            if (curHovering === null) {
                return relativeWidth;
            }

            if (curHovering === id) {
                return relativeWidth * scale;
            } else {
                return relativeWidth * ((1 - scale * width) / ((length - 1) * width));
            }
        },
    },
    mutations: {
        updateHoverImage({interaction}, id) {
            interaction.hovering = id;
        },
        updateDistribution(state, variance) {
            const config = state.interaction.config.a;

            if (config.distribution !== null) {
                config.distribution = null;
            }

            config.variance = variance;
            config.distribution = gaussian(0, config.variance);
        },
        updateWidth(state, newWidth) {
            state.width = newWidth;
        },
        updateMousePos(state, newX) {
            state.interaction.mouseX = newX;
        },
        assignImages(state, listURLToImages) {
            state.listImages = listURLToImages;
        },
    },
    actions: {
        init({commit}) {
            commit("updateDistribution", 5);
        },
    }
});
