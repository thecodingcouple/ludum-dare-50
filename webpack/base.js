const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    output: {
        clean: true
    },
    devtool: "eval-source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
          test: [/\.vert$/, /\.frag$/],
          type: 'asset/resource'
        },
        {
          test: /\.(gif|png|jpe?g|svg|xml)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
          template: "./index.html"
        })
      ]
    };