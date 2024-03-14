const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/app.js',
    mode: 'development',

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),

        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./src/images", to: "images"},
                {from: "./src/styles/styles.scss", to: "css"},
                {from: "./src/styles/libraries/adminlte.min.css", to: "css"},
                {from: "./src/styles/libraries/bootstrap.min.css", to: "css"},
                {from: "./src/styles/libraries/icheck-bootstrap.min.css", to: "css"},
                //{from: "./src/styles/libraries/all.min.css", to: "css"},
                //{from: "./src/jslib/chart.js", to: "js"},
                {from: "./src/jslib/adminlte.min.js", to: "js"},
                {from: "./src/jslib/jquery.min.js", to: "js"},
                {from: "./src/jslib/bootstrap.bundle.min.js", to: "js"},
                {from: "./src/jslib/chart.js", to: "js"},
                {from: "./.env", to: "./"},
            ]
        })
    ]
}