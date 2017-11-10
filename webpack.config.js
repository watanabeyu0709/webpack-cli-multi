/*
    总体：热加载(不含组件热加载),全局挂载,自动清理产出文件夹,区分处理开发和发布环境默认SPA

    html：html模板引擎,svg行内挂载

    css: less sass 分离样式表 自动补全前缀hack 支持css4(与less sass 冲突 选择性使用)

    js: 支持es6 typescript 代码分离 提取公共模块 丑化

    图片：压缩 base64编码

    字体：压缩
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板引擎
const CopyWebpackPlugin = require('copy-webpack-plugin');//copy静态文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//构建时清理
const ExtractTextPlugin = require("extract-text-webpack-plugin");//分离样式表
const extractCSS = new ExtractTextPlugin(process.env.NODE_ENV.includes('production')?'css/[name]-css.[chunkhash].css':'css/[name]-css.css');//导出css
const extractSass = new ExtractTextPlugin(process.env.NODE_ENV.includes('production')?'css/[name]-sass.[chunkhash].css':'css/[name]-sass.css');//导出sass
const babili = require('babili-webpack-plugin')//babel压缩

let webpackConfig = module.exports = {
    devtool: process.env.NODE_ENV.includes('production')?"cheap-module-source-map":"cheap-module-eval-source-map",
    entry: {},
    output: {
        filename: process.env.NODE_ENV.includes('production')?'js/[name].bundle.[chunkhash].js':'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'css': 'style-loader!css-loader',
                        'scss': 'style-loader!css-loader!postcss-loader!sass-loader',
                    }
                },
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1','postcss-loader'],
                    publicPath: "../"
                }),
            },
            {
                test: /\.less$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'less-loader'],
                    publicPath: "../"
                })
            },
            {
                test: /\.scss/i,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader','sass-loader'],
                    publicPath: "../"
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "env",
                            "stage-3"
                        ]
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel:process.env.NODE_ENV.includes('production')?7:1,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=font/[hash:8].[ext]'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                    'markup-inline-loader?strict=[markup-inline]',
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts",'.js', '.vue', '.json'],
        /*alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }*/
    },
    plugins: [
        //全局挂载
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        //自动产出html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/src/template.html",
            inject: 'body',
            hash: true,
            chunks: ['index'],
        }),
        //react 压缩处理
        (process.env.NODE_ENV === 'production')?
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }):function(){},
        //丑化JS
        (process.env.NODE_ENV.includes('production')) ? new babili() : function(){},
        //样式导出配置
        extractCSS,
        extractSass
    ]
};

/*设置多views*/
let view = '';
if(process.env.NODE_ENV.includes('Mobile')){
    view = 'mobile';
}else if(process.env.NODE_ENV.includes('Pc')){
    view = 'pc';
}
/*变化入口*/
webpackConfig.entry={
    index: ['babel-polyfill',`./src/views/${view}/index.js`],
};
/*变化出口*/
webpackConfig.output.path = path.resolve(__dirname, `dist/${view}`);
/*变化resolve*/
webpackConfig.resolve.alias={
    'vue$': 'vue/dist/vue.esm.js',
    '^': path.resolve(__dirname+'/src'),//项目根目录
    '@': path.resolve(`src/views/${view}`),//views根目录
};
/*plugins处理*/
webpackConfig.plugins.push(
    /*生产环境清理文件夹*/
    (process.env.NODE_ENV.includes('production'))?new CleanWebpackPlugin([`dist/${view}`]):function () {},
    /*copy静态static*/
    new CopyWebpackPlugin([{
        from: __dirname + '/src/static',
        to:  __dirname + `/dist/${view}/static`,
    }])
);


