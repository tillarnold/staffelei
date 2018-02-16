import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src-es6/index.js',
  output: {
    file: 'dist/staffelei-rollup.js',
    format: 'umd',
    name: 'Staffelei'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
