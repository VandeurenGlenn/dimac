// import json from  '@rollup/plugin-json'
import { execSync } from 'child_process'
import { nodeResolve } from '@rollup/plugin-node-resolve'

execSync('rm -rf www/*.js')


export default [
	{
		input: ['src/shell.js', 'src/views/home.js'],
		output: {
			dir: 'www',
			format: 'es',
			sourcemap: false
		},
		external: [
			'views/home.js'
		],
		plugins: [
			nodeResolve()
		]
	}, {
		input: ['src/themes/default.js'],
		output: {
			dir: 'www/themes',
			format: 'es',
			sourcemap: false
		}
	}
];
