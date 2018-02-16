import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'index.js',
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
