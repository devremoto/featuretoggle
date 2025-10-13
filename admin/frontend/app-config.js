const webpack = require('webpack');
const plugins = [new webpack.DefinePlugin({
    'process.env': {
        HOST: JSON.stringify(process.env.HOST),
        FRONT_PORT: JSON.stringify(process.env.FRONT_PORT),
        MS_MONGO_PORT: JSON.stringify(process.env.MS_MONGO_PORT),
        STS_PORT: JSON.stringify(process.env.STS_PORT),
        PATH: JSON.stringify(process.env.PATH),
        STS_SERVER: JSON.stringify(process.env.STS_SERVER),
        STS_ADMIN_SERVER: JSON.stringify(process.env.STS_ADMIN_SERVER),
        GO_PORT: JSON.stringify(process.env.GO_PORT),
    }
})];
console.log('Environment variables:', JSON.stringify(process.env, null, 2));
module.exports = { plugins };