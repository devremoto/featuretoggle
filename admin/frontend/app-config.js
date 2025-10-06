const webpack = require('webpack');
module.exports = {
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            HOST:JSON.stringify(process.env.HOST),
            FRONT_PORT:JSON.stringify(process.env.FRONT_PORT),
            MS_MONGO_PORT:JSON.stringify(process.env.MS_MONGO_PORT),
            STS_PORT:JSON.stringify(process.env.STS_PORT),
            PATH:JSON.stringify(process.env.PATH),
        }
    })]
};