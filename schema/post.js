const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = mongoose.Schema({
    description : {
        type: String,
        required: true
      }, 
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
      } ,
    signalement : {
        type: [ObjectId],
        required: true
      }, 
    userId : {
        type: ObjectId,
        required: true
      }, 
    categorie : {
        type: String,
        required: true
      },
    reponses : {
        type: [ObjectId],
        required: true
      }
})

module.exports = mongoose.model('post', schema);