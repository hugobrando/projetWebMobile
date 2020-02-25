const mongoose = require('mongoose');

const schema = mongoose.Schema({
    post : post,
    vue : boolean
})

module.exports = mongoose.model('notification', schema);