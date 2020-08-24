const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, '../mt-web-server/public'); // 打包出来的 生成到本地 node-server
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap){
    let htmlArray = [];
    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');

        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [ 'common', key]
            }));
        }


    });
    return htmlArray;
}

function getEntry(){
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname)=>{
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);

        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });

    return entryMap;

}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
    mode: 'production',
    entry: entryMap,
    resolve: {
        alias: {
            component: path.resolve(srcRoot, 'component')
        },
        extensions: ['.js','.jsx']
    },
    output: {
        path: distPath,
        filename: 'js/[name].[hash].min.js', // '[name].min.js'
        publicPath: '/' // 静态资源的根目录 可根据自己实际情况修改
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: [{loader: 'babel-loader'},{loader: 'eslint-loader'}],include: srcRoot},
            { test: /\.scss$/ , use:[   
                MiniCssExtractPlugin.loader, // css公共文件抽离   MiniCssExtractPlugin
                {loader:'css-loader',options:{minimize:true}},  // css压缩
                'sass-loader', 
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: srcRoot + '/component/rem_function.scss'
                    }
                }], 
                include: srcRoot}
            ,
            // 文件(图片) url-loader?limit=8192&name=./images/[name].[hash].[ext]
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]' , include: srcRoot}
        ]
    },
    optimization: {
        splitChunks:{
            cacheGroups:{
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }

            }
        }
    },
    plugins: [
        // outpath 文件夹清空
        new CleanWebpackPlugin([distPath],{allowExternal: true}), // 可以清除项目之外的 目录
        // copy自动添加文件到 文件夹
        new CopyWebpackPlugin([
            { from: 'src/json', to: path.resolve(distPath, 'json'), force: true },
            { from: 'src/static', to: path.resolve(distPath, 'static'), force: true }
        ]),
        // css 公共文件抽离
        new MiniCssExtractPlugin({ // MiniCssExtractPlugin
            filename: "css/[name].[hash].css",
        })
    ].concat(htmlArray)
};