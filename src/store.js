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
        ],
        width: 1,
        interaction: {
            mouseX: 1,
            distribution: null,
            // mean is determined by mouse position
            variance: 0,
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
            let relativeWidth = 1 + (state.config.height * getters.tan / state.width);

            if (state.interaction.gaussian === null) {
                return relativeWidth / state.listImages.length;
            }

            let width = getters.getDistributionByID(id);
            return width;
        },
    },
    mutations: {
        updateDistribution({interaction}, variance) {
            if (interaction.distribution !== null) {
                interaction.distribution = null;
            }

            interaction.variance = variance;
            interaction.distribution = gaussian(0, interaction.variance);
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
