const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = "src";
const dist = "target";

const extractCss = new ExtractTextPlugin({
    filename: "app.css"
});

module.exports = function (env) {
    env = env || {};
    const development = env["development"] || false;

    const config = {
        entry: "./" + src +"/__app.js",
        output: {
            filename: "__app.js",
            path: path.resolve(__dirname, dist)
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: ["node_modules"]
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: extractCss.extract({use: [{loader: "css-loader"}, {loader: "sass-loader"}]})
            }, {
                test: /\.css$/,
                use: extractCss.extract({use: [{loader: "css-loader"}]})
            }, {
                test: /\.tsx?$/, loader: 'ts-loader'
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'file-loader?name=[path][name].[ext]&context=' + src
                }, {
                    loader: 'extract-loader'
                }, {
                    loader: 'html-loader',
                    options: {
                        minimize: !development
                    }
                }]
            }, {
                test: [
                    /\.jpg$/,
                    /\.png$/,
                    /\.woff$/,
                    /\.woff2$/,
                    /\.ttf$/,
                    /\.eot$/,
                    /\.svg$/,
                    /\.gif$/,
                    /\.ico$/,
                    /\.txt$/
                ],
                loader: 'file-loader?name=[path][name].[ext]&context=' + src
            }]
        },
        plugins: [
            extractCss
        ]
    };

    if (development) {
        config.devtool = "cheap-module-eval-source-map";
        config.devServer = {
            contentBase: path.join(__dirname, dist),
            compress: true,
            port: 9999,
            overlay: true,
            host: "0.0.0.0",
            disableHostCheck: true,
            proxy: {
                "/a/spec_editor_endpoint": {
                    target: "http://localhost:8080",
                    ws: true,
                    secure: false
                },
                "/a/": {
                    target: "http://localhost:8080"
                }
            }
        }
    } else {
        config.plugins.push(new UglifyJSPlugin({comments: false}));
    }

    return config;
};
