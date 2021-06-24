const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = (env, argv) => {
    return {
        target: "node",
        entry: "./src/index.tsx",
        devServer: {
            port: 8080
        },
        output: {
            filename: "game.js",
            path: path.resolve(__dirname, "compiled"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/markup.html",
            }),
            (argv.mode !== "development") ? new WebpackObfuscator ({
                rotateStringArray: true
            }) : () => {},
            new CopyWebpackPlugin({
                patterns: [
                    { from: "src/assets", to: "assets" },
                ],
            })
        ],
        resolve: {
            modules: [__dirname, "src", "node_modules"],
            extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /.*node_modules.*/,
                    loader: require.resolve("babel-loader"),
                },
                {
                    test: /\.ts|tsx$/,
                    use: "awesome-typescript-loader",
                    include: [path.resolve(__dirname, "src")]
                },
                {
                    test: /\.scss|sass|css$/,
                    use: [true ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader", "sass-loader"],
                },
                {
                    test: /\.png|svg|jpg|gif|ttf|cur|mp3$/,
                    use: ["file-loader"]
                },
                {
                    test: /\.gsml$/,
                    use: 'raw-loader'
                }
            ],
        },
        watchOptions: {
            ignored: /.*node_modules.*/,
          },
    };
}
