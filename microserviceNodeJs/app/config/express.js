const express = require('express');
const bodyParser = require('body-parser');
var load = require('express-load');
const expressValidator = require('express-validator');
const cors = require('cors');
const swaggerRouter = require('../routes/swagger.route');
const urlPrefix = '/featuretoggle';
const consts = require('./config');
module.exports = (function () {
    const app = express();
    const http = require('http').Server(app);

    let name = 'featuretoggle';
    const io = require('socket.io')(http, {
        cors: {
            origin: "*"
        }
    });
    app.set('io', io);
    io.on('connection', socket => {
        socket.on("hello", (arg) => {
            console.log(arg); // world
        });
        console.log('connected', JSON.stringify(socket.id));

    });
    io.on('list', result => {
        console.log('=================io funcionando=================\n');
        console.log(result);
    });
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // Enable Swagger
    app.urlPrefix = urlPrefix;
    swaggerRouter(app);

    load('routes', {
        cwd: 'app'
    }).into(app);

    app.use((req, res, next) => {
        res.status(404).send({
            code: 404
        });
        next();
    });

    app.use((error, req, res, next) => {
        if (process.env.NODE_ENV === 'production') {
            res.status(500).send({
                code: 500
            });
            return;
        }
        console.log(error);
        next(error);
    });

    app.urlPrefix = urlPrefix;

    app.start = () => {
        let port = process.env.MS_MONGO_PORT || consts.PORT;
        http.listen(port, () => {
            //console.clear();
            console.log(`
================================================================================================
================================================================================================

Server running on
http://localhost:${port}

GET
curl http://localhost:${port}/${name}s

Swagger Document
http://localhost:${port}/api/swagger

================================================================================================
================================================================================================

${JSON.stringify(consts, null, 2)}
`);
        });
    };

    return app;
})();