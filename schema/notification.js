const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = mongoose.Schema({
    postId : {
        type: ObjectId,
        required: true,
        ref: 'Post'
      },
    vue:{
        type: Boolean,
        required: true
      },
      create: { 
        type: Date,
        default: Date.now
      }  

})

module.exports = mongoose.model("Notification", schema);