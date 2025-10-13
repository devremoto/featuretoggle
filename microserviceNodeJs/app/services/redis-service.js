const JL = require('jsnlog').JL;
var client = require('../infra/redis-connection').createConnection();

const redisService = {
    flatTree: [],
    /**
     * It takes a json list from mongo
     * and converts into a flatList
     */
    parse: el => {

        let element = JSON.parse(JSON.stringify(el));
        while (element) {
            redisService.fill(element);
            if (element.children) {
                element.children.forEach(obj => {
                    if (!element.enabled) {
                        obj.enabled = false;
                    }
                    redisService.parse(obj);
                });
            }
            element = null;
        }
    },

    fill: obj => {

        let value = JSON.parse(JSON.stringify(obj));
        let key = value.name;
        delete value.name;
        delete value.tempName;
        delete value._id;
        delete value.refid;
        delete value.level;
        delete value.__v;
        delete value.expandable;

        if (!redisService.flatTree.find(x => x.key == key)) {
            if (value.children) {
                delete value.children;
            }
            redisService.flatTree.push({
                key,
                value
            });
        }
    },

    deleteTree: key => {
        return new Promise((resolve, reject) => {
            let pattern = key ? `${key}:*` : '*';
            client.keys(pattern, (err, keys) => {
                if (!err && keys.length) {
                    JL('redis-service').info(`keys to delete: ${keys}`);
                    client.del(keys, (err, val) => {
                        if (err) {
                            JL('redis-service').error(
                                `remove key error: ${keys}`
                            );
                            reject(err);
                        } else {
                            resolve(val);
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    },

    deleteAll: async () => await redisService.deleteTree(),

    syncList: async listFromMongo => {
        JL('redis-service:sync').info('init');

        try {
            JL('redis-service:sync').info('init promisse');
            await redisService.deleteAll();
        } catch (error) {
            const errorMessage = `error deleting all keys: ${JSON.stringify(error)}`
            JL('redis-service:sync').error(errorMessage);
            throw new Error(errorMessage);
        };

        JL('redis-service:sync').info('delete all');
        redisService.flatTree = [];
        listFromMongo.forEach(nodeElement => {
            redisService.parse(nodeElement);
        });
        try {
            const result = await redisService.populateRedis(redisService.flatTree)
            JL('redis-service:sync').info(`OK: ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            const errorMessage = `error populating redis: ${JSON.stringify(error)}`
            JL('redis-service:sync').error(errorMessage);
            throw new Error(errorMessage);
        }
    },

    populateRedis: flatList => {
        return new Promise((resolve, reject) => {
            var multi = client.multi();
            if (!flatList || !flatList.length) {
                reject('flat list is empty');
            }
            flatList.forEach(element => {
                if (element.key) {
                    multi.mset(element.key, JSON.stringify(element.value));
                }
            });
            multi.exec((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(flatList.map(x => x.key));
                }
            });
        });
    }
};


module.exports = redisService;