import Vue from "vue";
import Vuex from "vuex";
import gaussian from "gaussian";

import {degreeToRad} from "./helper";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        listImages: [
            "assets/test-0.jpg",
            "assets/test-1.jpg",
            "assets/test-2.jpg",
            "assets/test-3.jpg",
            "assets/test-4.jpg",
            "assets/test-5.jpg",
            "assets/test-6.jpg",
            "assets/test-7.jpg",
            "assets/test-8.jpg",
        ],
        // update on mounted
        width: 1,
        interaction: {
            mode: "b",
            hovering: null,
            mouseX: 1,
            config: {
                a: {
                    distribution: null,
                    variance: 0
                },
                b: {
                    scale: 3
                }
            },
        },
        config: {
            radius: 30,
            height: 200,
            maxNumberImage: 10,
            degreeSkew: 15,
            border: {
                thickness: 4,
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
         * 返回整体宽度的百分比
         * @param state
         * @returns {function(*): number}
         */
        getWidthByID: (state, getters) => (id) => {
            let callback = null;

            const mode = state.interaction.mode;
            switch (mode) {
                case "a":
                    callback = () => {};
                    break;
                case "b":
                    callback = getters.getWidthByIDModeNormal;
                    break;
                default:
                    throw "Error: Invalid mode: " + id;
            }

            return callback(id);
        },
        getWidthByIDModeNormal: (state, getters) => (id) => {
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
        }
    }
});
