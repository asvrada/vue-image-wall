import resolve from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import VuePlugin from 'rollup-plugin-vue';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: './src/install.js',
    output: {
      name: 'VueImageWall',
      file: pkg.main,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      VuePlugin(),
      buble(),
      terser(),
      filesize(),
    ],
  },

  // ESM build
  {
    input: './src/install.js',
    external: ['vue', 'lodash'],
    output: [
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(),
      commonjs(),
      VuePlugin(),
      terser(),
      filesize(),
    ],
  },
];
