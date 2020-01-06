const JL = require('jsnlog').JL;
const repository = require('../infra/repositories/mongo-repository');

module.exports = {
    list: async () => {
        return await repository.getAll();
    },

    getByName: async name => {
        const result = await repository.find({ query: { name } })
        if (result.length == 1) {
            return result[0];
        } else if (result.length <= 0) {
            throw new Error(`The feature  not found`);
        } else {
            throw new Error(`Found ${result.length} features with (${name})`);
        }
    },

    create: async (entity, socketIo) => {
        if (entity) {
            const search = await repository.find({ query: { name: entity.name } });
            if (search.length == 0) {
                const result = await repository.add(entity, socketIo);
                return result;
            } else {
                throw new Error(`"feature alread exist" ${JSON.stringify(result.name)}`);
            }
        } else {
            throw new Error('file not send in request');
        }
    },

    update: async (entity, socketIo) => {
        const search = await repository.find({ query: { name: entity.name } });
        JL('mongo-service:update').info('find');
        if (search.length <= 1) {
            const sameName = search.find(x => x.refid != entity.refid);
            if (sameName) {
                throw new Error(`already exists a feature with the name ${entity.name}`);
            }
            const result = await repository.update(entity, socketIo);
            return result;
        } else if (search.length > 1) {
            throw new Error(`more than one feature with the same name`);
        } else {
            throw new Error(`object not found ${search.length}`);
        }
    },

    delete: async (id, socketIo) => {
        const search = await repository.find({ query: { _id: id } })
        if (search) {
            const result = await repository.delete(id, socketIo);
            return result;
        } else {
            throw new Error(`Can not delete the Id ${id} not found`);
        }
    }
};
