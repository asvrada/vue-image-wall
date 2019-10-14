import Vue from "vue";
import Vuex from "vuex";

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
     * Width of this entire component (image wall)
     */
    width: 0,
    interaction: {
      /**
       * Mode a: apple macOS docker style (todo)
       * Mode b: Image current cursor hovering over enlarges, other images shrinks
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
        b: {
          // How much bigger will the hovering image be than others
          scale: 3,
          // duration of transition animation
          duration: 500
        }
      },
    },
    config: {
      radius: 30,
      height: 200,
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
    /**
     * Get the width (in percentage) of the image of given id
     *
     * @return {*} the width in range [0, 1]
     */
    getWidthByID: (state, getters) => (id) => {
      let callback = null;

      const mode = state.interaction.mode;
      switch (mode) {
        case "b":
          callback = getters.getWidthByIDModeB;
          break;
        default:
          throw "Error: Invalid mode: " + mode;
      }

      return callback(id);
    },
    /**
     * Get the width of a image given id (in percentage)
     */
    getWidthByIDModeB: (state, getters) => (id) => {
      const length = state.listImages.length;

      // Before width is inited, which will be 1, return 1 / N
      // where N is the number of images
      if (state.width === 0) {
        return 1 / length;
      }

      // Total width of this component, to account for the width lost with skewed images on both ends
      const relativeTotalWidth = 1 + (state.config.height * getters.tan / state.width);

      // width, in percentage, of each images
      const width = 1 / length;

      // above width taken skew into account
      const relativeWidth = relativeTotalWidth / length;

      // id of the image currently hovering over
      const curHovering = state.interaction.hovering;
      if (curHovering === null) {
        return relativeWidth;
      }

      const scale = state.interaction.config.b.scale;

      if (curHovering === id) {
        return relativeWidth * scale;
      } else {
        return relativeWidth * ((1 - scale * width) / ((length - 1) * width));
      }
    }
  },
  mutations: {
    setHoverImage({interaction}, id) {
      interaction.hovering = id;
    },
    setWidth(state, newWidth) {
      state.width = newWidth;
    },
    setMousePos(state, newX) {
      state.interaction.mouseX = newX;
    },
    setImages(state, listURLToImages) {
      state.listImages = listURLToImages;
    },
  },
  actions: {
    init() {
    }
  }
});
