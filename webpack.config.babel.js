/**
 * Created by reditaru on 2017/12/25.
 */
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.join(ROOT_DIR, 'src');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
const NODE_ENV = process.env.NODE_ENV || 'development';
const __DEV__ = NODE_ENV === 'development';
export default {
    entry: {
        index: path.join(SRC_DIR, 'app.js'),
        vendor: ['vue', 'vue-router', 'vuex']
    },
    output: {
        path: OUTPUT_DIR,
        filename: __DEV__? 'js/[name].js' : 'js/[name].[hash:8].js',
        publicPath: '/admin/'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
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
    plugins: [
        new ExtractTextPlugin({
            filename:'css/index.css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest",],
            minChunks: Infinity,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
            chunks: ['manifest', 'vendor', 'index']
        }),
		new BundleAnalyzerPlugin()
    ],
    devtool:__DEV__? "cheap-module-eval-source-map" : false,
    devServer: {
        contentBase: '/dist',
        historyApiFallback: true,
        inline: true,
        hot: true,
        publicPath: '/admin/'
    }
}
