const JL = require('jsnlog').JL;
const repository = require('../infra/repositories/mongo-repository');

module.exports = {
    list: () => {
        return repository.getAll();
    },

    getByName: name => {
        return new Promise((resolve, reject) => {
            repository
                .find({ query: { name } })
                .then(result => {
                    if (result.length == 1) {
                        resolve(result[0]);
                    } else if (result.length <= 0) {
                        reject(`The feature  not found`);
                    } else {
                        reject(
                            `Found ${result.length} features with (${name})`
                        );
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    create: (entity, socketIo) => {
        return new Promise((resolve, reject) => {
            if (entity) {
                repository
                    .find({ query: { name: entity.name } })
                    .then(result => {
                        if (result.length == 0) {
                            repository
                                .add(entity, socketIo)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(err => {
                                    JL('mongo-service:create').error(err);
                                    reject(err);
                                });
                        } else {
                            reject(
                                `"feature alread exist" ${JSON.stringify(
                                    result.name
                                )}`
                            );
                        }
                    });
            } else {
                reject('file not send in request');
            }
        });
    },

    update: (entity, socketIo) => {
        return new Promise((resolve, reject) => {
            repository
                .find({ query: { name: entity.name } })
                .then(result => {
                    JL('mongo-service:update').info('find');
                    if (result.length <= 1) {
                        let search = result.find(x => x.refid != entity.refid);
                        if (search) {
                            reject(
                                `already exists a feature with the name ${
                                    entity.name
                                }`
                            );
                        }
                        repository
                            .update(entity, socketIo)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                JL('mongo-service:update error').error(error);
                                reject(error);
                            });
                    } else if (result.length > 1) {
                        reject(`more than one feature with the same name`);
                    } else {
                        reject(`object not found ${result.length}`);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    delete: (id, socketIo) => {
        return new Promise((resolve, reject) => {
            repository.find({ query: { _id: id } }).then(entity => {
                if (entity) {
                    repository.delete(id, socketIo).then(result => {
                        resolve(result);
                    });
                } else {
                    reject(`Can not delete the Id ${id} not found`);
                }
            });
        });
    }
};
