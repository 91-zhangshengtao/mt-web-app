const webpack = require('webpack')
const path = require('path');
/* plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

/* 路径  path.resolve(__dirname, 'x'x'x') */
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

/* HtmlWebpackPlugin template 配置 */
function getHtmlArray(entryMap){
    let htmlArray = [];
    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');
        
        // 不需要手动去改打包后的文件
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

/* 对src/page下 每个入口遍历map 生成Entry */
function getEntry(){
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname)=>{ // fs.readdirSync 同步读取文件夹
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName); // fs.statSync 路径/文件
        let fileName = path.resolve(fullPathName, mainFile); // 'index.js'

        if (stat.isDirectory() && fs.existsSync(fileName)) { 
            // stat为路径不是文件  fileName窜在index.js文件
            entryMap[pathname] = fileName;
        }
    });
    return entryMap;
}

const entryMap = getEntry();
// console.log('entryMap:',entryMap);
// { 
//     detail:
//         'D:\\x\\project-studyxxxxxxxmt-web-app\\src\\page\\detail\\index.js',
//     index:
//         'D:\\x\\project-studyxxxxx\\mt-web-app\\src\\page\\index\\index.js' 
// }

const htmlArray = getHtmlArray(entryMap);
console.log('htmlArray:',htmlArray)
/*
[ HtmlWebpackPlugin {
    options:
     { template:
        'D:\\x\\project-study\\react-project-study\\meituan\\waimai-my\\mt-web-app\\src\\page\\detail\\detail.html',
       templateParameters: [Function: templateParametersGenerator],
       filename: 'detail.html',
       hash: false,
       inject: true,
       compile: true,
       favicon: false,
       minify: false,
       cache: true,
       showErrors: true,
       chunks: [Array],
       excludeChunks: [],
       chunksSortMode: 'auto',
       meta: {},
       title: 'Webpack App',
       xhtml: false } },
  HtmlWebpackPlugin {
    options:
     { template:
        'D:\\x\\project-study\\react-project-study\\meituan\\waimai-my\\mt-web-app\\src\\page\\index\\index.html',
       templateParameters: [Function: templateParametersGenerator],
       filename: 'index.html',
       hash: false,
       inject: true,
       compile: true,
       favicon: false,
       minify: false,
       cache: true,
       showErrors: true,
       chunks: [Array],
       excludeChunks: [],
       chunksSortMode: 'auto',
       meta: {},
       title: 'Webpack App',
       xhtml: false } } ]

*/


module.exports = {
    mode: 'development',
    devServer: {
        contentBase: devPath,
        hot: true
    },
    entry: entryMap, // 入口 {key1: value1, key2: value2}
    resolve: { 
        alias: {
            component: path.resolve(srcRoot, 'component')
        },
        extensions: ['.js','.jsx'] // 扩展名省略
    },
    output: {
        path: devPath,
        filename: '[name].min.js' // 根据entry
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: [
                    {loader: 'babel-loader'},
                    {loader: 'eslint-loader'} // 加eslint-loader
                ],
                include: srcRoot
            }, // sr文件夹下生效
            { 
                test: /\.css$/ , use:[
                    'style-loader',{
                        'loader':'css-loader',// options:{minimize: true}
                    }],
                include: srcRoot
            },
            { test: /\.scss$/ , use:['style-loader','css-loader','sass-loader', 
                {
                    loader: 'sass-resources-loader', // 打包时 加载进去
                    options: {
                        resources: srcRoot + '/component/rem_function.scss'
                    }
                }
            ], include: srcRoot},
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192' , include: srcRoot} //大致8K, < 8192 转base64,>=8192 直接引入静态资源
        ]
    },
    // optimization: {
    //     splitChunks:{
    //         cacheGroups:{
    //             common: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: 'all',
    //                 name: 'common'
    //             }
    //         }
    //     }
    // },
    plugins: [
        new webpack.NamedModulesPlugin(), // 热更新
        new webpack.HotModuleReplacementPlugin(), //热更新
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ].concat(htmlArray) // htmlArray ：HtmlWebpackPlugin template 配置
};