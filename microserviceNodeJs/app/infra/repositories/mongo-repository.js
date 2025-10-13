const connection = require('../mongo-connection');
const model = require('../../models/featuretoggle');
const EventEmitter = require('events');
const redisService = require('../../services/redis-service');
const e = require('express');
const JL = require('jsnlog').JL;
class Emitter extends EventEmitter { }
const emitter = new Emitter();

emitter.on('create', sync);
emitter.on('update', sync);
emitter.on('delete', sync);

function sync(data) {

    connection
        .getAll(model)
        .then(list => {
            redisService
                .syncList(list)
                .then(res => {
                    data.socketIo.emit('update', res);
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

const mongoRepository = {
    add: async (data, socketIo) => {
        if (data.parent) {
            data.parent = data.parent._id;
        }
        try {
            const res = await connection.add(model, data);
            mongoRepository.emit('create', data, socketIo);
            return res;
        } catch (err) {
            throw new Error(err);
        };
    },

    delete: async (id, socketIo) => {
        try {
            const res = await connection
                .delete(model, id);
            mongoRepository.emit('delete', res, socketIo);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    update: async (data, socketIo) => {
        try {
            const res = await connection
                .update(model, data);
            console.log(data);
            JL('repository').info(`update - OK:${JSON.stringify(data)} ${JSON.stringify(res)}`);
            mongoRepository.emit('update', res, socketIo);
            return res;
        } catch (err) {
            JL('repository').error(
                `update - ERROR:${JSON.stringify(
                    data
                )} ${JSON.stringify(err)}`
            );
            throw new Error(err);
        }
    },

    getAll: async (socketIo) => {
        try {
            const docs = await connection.getAll(model);
            mongoRepository.emit('list', docs, socketIo);
            return docs;
        } catch (error) {
            throw new Error(error);
        }
    },
    find: async (data, socketIo) => {

        var result = await connection.find({ model, query: data.query });
        if (socketIo && result) {
            mongoRepository.emit('find', data, socketIo);
        }
        return result;


    },
    emit: (event, data, socketIo) => {
        console.log(`emitting`, event);
        if (event == 'list' || event == 'find') {
            socketIo.emit(event, data);
            return;
        }
        emitter.emit(event, { data, socketIo });
    }
};

module.exports = mongoRepository;
