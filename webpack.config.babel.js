/**
 * Created by reditaru on 2017/12/25.
 */
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const ROOT_DIR = path.resolve(__dirname)
const SRC_DIR = path.join(ROOT_DIR,'src')
const OUTPUT_DIR = path.join(ROOT_DIR,'dist')
const NODE_ENV = process.env.NODE_ENV||'development';
const __DEV__ = NODE_ENV === 'development';
export default {
    entry:{
        index:path.join(SRC_DIR,'app.js')
    },
    output:{
        path:OUTPUT_DIR,
        filename:__DEV__? 'js/[name].js':'js/[name].[hash:8].js',
        publicPath:'/'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module:{
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test:/\.(less)$/,
                loader:'style-loader!css-loader!less-loader'
            },
            {
                test:/\.(css)$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.(jpe|gif|png|ttf|eot|svg|jpg)$/,
                use: 'file-loader?name=image/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff&name=font/[name].[ext]?[hash]'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'
        })
    ],
    devtool:__DEV__? "cheap-module-eval-source-map":false,
    devServer: {
        contentBase: '/dist',
        historyApiFallback: true,
        inline: true,
        hot:true
    }
}
