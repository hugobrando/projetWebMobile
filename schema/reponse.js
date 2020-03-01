const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = mongoose.Schema({
    libelle : {
        type: String,
        required: true
      },
    like : {
        type: [ObjectId],
        required: true
      },
    dislike : {
        type: [ObjectId],
        required: true
      },
    signalement : {
        type: [ObjectId],
        required: true
      },
    userId : {
        type: ObjectId,
        required: true
      }   
})

module.exports = mongoose.model('reponse', schema);