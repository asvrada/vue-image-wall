import VueImageWall from './components/ImageWallWrapper.vue';

const componentName = 'vue-image-wall';

// For use as global component
// To use: Vue.use(VueImageWall)
VueImageWall.install = function (Vue) {
  Vue.component(componentName, VueImageWall);
};

// For browser tag <script> usage
// No need to register (its done here)
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(componentName, VueImageWall);
}

export default VueImageWall;
