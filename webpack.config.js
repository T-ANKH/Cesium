const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        chunkFilename: 'async/[name].[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        sourcePrefix: "",// 需要这个配置来编译Cesium中的多行字符串
        clean: true,//清理dist文件夹
    },
    amd: {
        // 启用webpack友好的方式来处理Cesium中的require语句
        toUrlUndefined: true,
    },
    devtool: 'inline-source-map',//使用映射工具
    resolve: {
        alias: {
            cesium: path.resolve(__dirname, cesiumSource),
        },
        mainFiles: ["module", "main", "Cesium"],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'MyAssets/[name][hash][ext][query]'
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        // 将Cesium的Assets、Widgets和Workers复制到静态目录
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
                { from: path.join(cesiumSource, "Assets"), to: "Assets" },
                { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
            ],
        }),
        new webpack.DefinePlugin({
            // 定义Cesium加载资源文件时使用的相对基础路径
            CESIUM_BASE_URL: JSON.stringify(""),
        }),
    ],
    mode: "development",
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },

    },

};