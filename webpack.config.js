//引用path模組
const path = require('path');
module.exports = {
    entry: ['./index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './lib'),
    },
    module: {
        rules: [
            { 
                test: /.jsx$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { presets: ['@babel/preset-react','@babel/preset-env'] } } 
            },
            { 
                test: /.js$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } }
        ]
    }
};