const JL = require('jsnlog').JL;
const consts = require('../config/config');

var client = require('../infra/redis-connection').createConnection();

module.exports = {
    flatTree: [],
    /**
     * It takes a json list from mongo
     * and converts into a flatList
     */
    parse: el => {
        let $this = module.exports;
        let element = JSON.parse(JSON.stringify(el));
        while (element) {
            $this.fill(element);
            if (element.children) {
                element.children.forEach(obj => {
                    if (!element.enabled) {
                        obj.enabled = false;
                    }
                    $this.parse(obj);
                });
            }
            element = null;
        }
    },

    fill: obj => {
        let $this = module.exports;
        let value = JSON.parse(JSON.stringify(obj));
        let key = value.name;
        delete value.name;
        delete value.tempName;
        delete value._id;
        delete value.refid;
        delete value.level;
        delete value.__v;
        delete value.expandable;

        if (!$this.flatTree.find(x => x.key == key)) {
            if (value.children) {
                delete value.children;
            }
            $this.flatTree.push({
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

    deleteAll: () => {
        let $this = module.exports;
        return $this.deleteTree();
    },

    syncList: listFromMongo => {
        JL('redis-service:sync').info('init');
        let $this = module.exports;
        return new Promise((resolve, reject) => {
            JL('redis-service:sync').info('init promisse');
            $this.deleteAll().then(() => {
                JL('redis-service:sync').info('delete all');
                $this.flatTree = [];
                listFromMongo.forEach(nodeElement => {
                    $this.parse(nodeElement);
                });
                $this
                    .populateRedis($this.flatTree)
                    .then(result => {
                        JL('redis-service:sync').info(
                            `OK: ${JSON.stringify(result)}`
                        );
                        resolve(result);
                    })
                    .catch(error => {
                        JL('redis-service:sync').error(
                            `error on populate redis: ${JSON.stringify(error)}`
                        );
                        reject(error);
                    });
            });
        }).catch(error => {
            JL('redis-service:sync').error(
                `error deleting all keys: ${JSON.stringify(error)}`
            );
        });
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
            multi.exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(flatList.map(x => x.key));
                }
            });
        });
    }
};
