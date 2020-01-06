const JL = require('jsnlog').JL;
const service = require('../services/mongo-service');

module.exports = {
    list: async (req, res) => {
        try {
            const result = await service.list();
            req.io.emit('list', result);
            JL('controller:list').info(result);
            req.io.on('list', result => {
                console.log('=================io funcionando=================\n');
                console.log(result);
            });
            res.send(result);
        } catch (error) {
            JL('controller:list:error').error(error);
            res.status(500).send({ error });
        }
    },

    getByName: async (req, res) => {
        try {
            const result = await service.getByName(req.params.name)
            res.send(result);
        } catch (error) {
            JL('controller').error(
                `error calling repository: ${JSON.stringify(error)}`
            );
            res.status(500).send({ error: `${JSON.stringify(error)}` });
        }
    },

    create: async (req, res) => {
        try {
            const result = await service.create(req.body, req.io);
            JL('controller').info(`feature created sucessfully: ${JSON.stringify(result)}`);
            res.status(201).send(result);
        } catch (error) {
            JL('controller').error(`error calling repository: ${JSON.stringify(error)}`);
            res.status(500).send({ error: `${JSON.stringify(error)}` });
        }
    },

    update: async (req, res) => {
        try {
            const result = await service.update(req.body, req.io);
            JL('controller').info(`feature updated sucessfully: ${JSON.stringify(result)}`);
            res.send(result);
        } catch (error) {
            JL('controller').error(`error calling repository: ${JSON.stringify(error)}`);
            res.status(500).send({ error: `${JSON.stringify(error)}` });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await service.delete(req.params.id, req.io);
            JL('delete').info({ id: req.params.id, result });
            res.send(result);
        } catch (error) {
            JL().error(error);
            res.status(500).send({ error });
        }
    }
};
