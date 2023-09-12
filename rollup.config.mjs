
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';

export default [
	// {
	// 	input: 'src/subverse-table-view.mjs',
	// 	output: {
	// 		file: 'dist/subverse-table-view.es.mjs',
	// 		format: 'es'
	// 	},
	// 	plugins: [resolve()]
	// },
	{
		input: 'src/subverse-table-view.mjs',
		output: {
			file: 'dist/subverse-table-view.cjs',
			format: 'cjs'
		},
		plugins: [resolve(), commonjs()]
	}
];