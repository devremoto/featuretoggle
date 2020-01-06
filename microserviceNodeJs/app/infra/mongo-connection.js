const mongoose = require('mongoose');
const consts = require('../config/config');
var DB_URL = process.env.DB_URL || consts.DB_URL;

const mongoConnection = {
    createConnection: () => {
        return new Promise((resolve, reject) => {
            let objConn = {}
            mongoose.connect(
                DB_URL,
                { useNewUrlParser: true },
                (error) => {
                    if (error) {
                        return reject(objConn);
                    } else {
                        return resolve(objConn)
                    }
                }
            );
        })
    },
    add: async (model, data) => {
        if (data instanceof Array) {
            return await model.insertMany(data);
        } else {
            return await new model(data).save()
        }
    },
    update: async (model, data) => {
        return await model.findOneAndUpdate({ _id: data._id }, data);
    },
    delete: async (model, id) => {
        return await model.findOneAndDelete({ _id: id });
    },
    getAll: async (model) => {
        return await model.find({});
    },
    find: async (data) => {
        return await data.model.find(data.query);
    }
}

module.exports = mongoConnection;