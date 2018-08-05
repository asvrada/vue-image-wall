import Vue from "vue";
import Vuex from "vuex";

import {degreeToRad} from "./helper";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        listImages: [null, null, null, null],
        width: 0,
        config: {
            radius: 30,
            // get this at runtime
            width: 0,
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
            return Math.tan(degreeToRad(state.config.degreeSkew))
        },
        getContainerOffset: (state, getters) => {
            return state.config.height / 2 * getters.tan;
        },
        /**
         * 返回整体宽度的百分比
         * @param state
         * @returns {function(*): number}
         */
        getWidthByID: (state, getters) => (id) => {
            let relativeWidth = 1 + (state.config.height * getters.tan / state.config.width);
            return relativeWidth / state.listImages.length;
        },
    },
    mutations: {
        updateWidth(state, newWidth) {
            state.config.width = newWidth;
        },
        assignImages(state, listURLToImages) {
            state.listImages = listURLToImages;
        },
    },
    actions: {}
});
