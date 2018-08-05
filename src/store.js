import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pathPrefix: "",
        listImages: [],
        config: {
            radius: 30,
            height: 200,
            maxNumberImage: 10,
            offset: -30,
            degreeSkew: 15,
            border: {
                thickness: 4,
                color: "orange"
            },
        }
    },
    getters: {},
    mutations: {},
    actions: {}
});
