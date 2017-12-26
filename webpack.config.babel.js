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
        filename:__DEV__? 'static/js/[name].js':'static/js/[name].[hash:8].js',
        publicPath:'/dist/'
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
                test:/\.(css|less)$/,
                loader:'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(jpe|gif|png|ttf|eot|svg|jpg)$/,
                use: 'file-loader?name=static/image/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff&name=static/font/[name].[ext]?[hash]'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'static/index.html',
            template:'./index.html'
        })
    ],
    devtool:__DEV__? "cheap-module-eval-source-map":false,
    devServer: {
        contentBase: './dist/static',
        historyApiFallback: true,
        inline: true,
        hot:true
    }
}
