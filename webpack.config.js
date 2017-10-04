const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index',


    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/public'
    },

    devServer: {
        host: '127.0.0.1',
        port: 4000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        contentBase: path.join(__dirname, 'public'),
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets:[ 'es2015', 'react', 'stage-2' ]
            }
        },
        {
            test: /\.scss$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
            })),
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'file-loader'
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [
            'node_modules'
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],

    devtool: 'cheap-eval-source-map' // remove for build
};

