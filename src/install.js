import VueImageWall from './components/ImageWallWrapper';
export default VueImageWall;
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueImageWall', VueImageWall);
}
