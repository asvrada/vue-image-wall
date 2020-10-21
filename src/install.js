import VueImageWall from './components/ImageWallWrapper';

export default VueImageWall;

// For browser tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueImageWall', VueImageWall);
}
