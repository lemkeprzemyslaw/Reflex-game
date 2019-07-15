const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const entryFile = fs.existsSync('./src/index.ts') ? './src/index.ts' : './src/index.js';

module.exports = {
    entry: ['@babel/polyfill', entryFile],
    devtool: "inline-source-map",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'docs')
    },
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: path.join(__dirname, "docs"),
        port: 9000,
        overlay: {
            warnings: false,
            errors: true
        },
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ]
            }
        ],
    },
    plugins: [
        new WriteFilePlugin(),
        new CleanWebpackPlugin(['docs/*.*']),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/static'),
                to: path.join(__dirname, 'docs')
            }
        ])
    ],
    performance: {
        hints: false
    }
};