module.exports = {
    DB_URL: process.env.DB_URL || `mongodb://localhost:27027/featuretoggledb`,
    PORT: process.env.MS_MONGO_PORT || 5051,
    REDIS_SERVER: process.env.REDIS_SERVER || 'ft-redis',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    IO: null
};