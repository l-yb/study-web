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
	}
}
