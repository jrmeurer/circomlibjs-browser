import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';
import jsonPlugin from '@rollup/plugin-json';

const empty = 'export default {}';

export default {
  input: 'index.js',
  output: {
    file: 'build/circomlibjs.js',
    format: 'umd',
    sourcemap: 'inline',
    name: 'circomlibjs',
  },
  plugins: [
    commonJS(),
    nodePolyfills(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    terser(),
    nodeResolve({
      browser: true,
      exportConditions: ['browser', 'default', 'module', 'require'],
    }),
    jsonPlugin(),
  ],
  onwarn: (warning) => {
    if (
      warning.code === 'THIS_IS_UNDEFINED' ||
      warning.code === 'CIRCULAR_DEPENDENCY'
    ) {
      return;
    }
    console.warn(warning.message);
  },
};
