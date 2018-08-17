import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    plugins: [
        resolve({
            jsnext: true,
        }),
        vue(),
        buble({
            objectAssign: 'Object.assign',
        }),
        commonjs(),
    ],
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        },
    ],
};
