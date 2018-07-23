'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin=require('extract-text-webpack-plugin')
module.exports = {
     mode:'development',
    devtool: '#source-map',
    // 入口文件
    entry: {
        app: './public/javascripts/app.js',
    },
    // 编译后输出文件
    output: {
        path: path.join(__dirname, '/public/dest'),
        filename: '[name].js',
    },
    module: {
        // 调用 babel-loader 编译 react 组件
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" , }] // `style: true` 会加载 less 文件
                        ]
                    }
                },
                exclude: /node_modules/
            },
           // {test: /.css$/, use: ['style-loader', 'css-loader']},/*解析css, 并把css添加到html的style标签里*/
            {test: /.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'}),include:/public/},/*解析css, 并把css变成文件通过link标签引入*/
            {test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']},/*解析图片*/
            {//antd样式处理
                test:/\.css$/,
                exclude:/public/,
                use:[
                    { loader: "style-loader",},
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders:1
                        }
                    }
                ]
            },

            {

                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'] // 编译顺序从右往左
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: ['file-loader']
            },
        ]
    },
    resolve: {
        modules: ["node_modules"]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};