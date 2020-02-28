const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = mongoose.Schema({
    postId : {
        type: ObjectId,
        required: true
      },
    vue:{
        type: Boolean,
        required: true
      }
})

module.exports = mongoose.model('notification', schema);