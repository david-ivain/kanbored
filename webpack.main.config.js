const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("node:path");

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: "./src/main.cjs",
	// Put your normal webpack config below here
	module: {
		rules: require("./webpack.rules"),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "main", "assets"),
					to: path.resolve(
						__dirname,
						".webpack/main",
						"main",
						"assets"
					),
				},
			],
		}),
	],
};
