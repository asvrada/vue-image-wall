import ImageWall from "./components/ImageWall";
import store from "./store";

// Declare install function executed by Vue.use()
function install(Vue, store) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ImageWall', ImageWall);
  // store.registerModule('vue-imagewall', store);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
  install,
};

export {ImageWall};