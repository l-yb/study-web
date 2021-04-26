
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	devServer: {
		disableHostCheck: true,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8089/api',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},

	chainWebpack(config) {
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test

		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		// set preserveWhitespace
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()
	}
}
