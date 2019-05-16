const mongoose = require("mongoose");

const schema = mongoose.model('featuretoggle', {
    refid:String,
    name: String,
    environments: [],
    expiration:String,
    users: [],
    children: [],
    enabled: Boolean
})
module.exports = schema