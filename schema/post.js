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
        required: true,
        ref: 'User'
      },
    dislike : {
        type: [ObjectId],
        required: true,
        ref: 'User'
      } ,
    signalement : {
        type: [ObjectId],
        required: true,
        ref: 'User'
      }, 
    userId : {
        type: ObjectId,
        required: true,
        ref: 'User'
      }, 
    categorie : {
        type: String,
        required: true
      },
    reponses : {
        type: [ObjectId],
        required: true,
        ref: 'Reponse'
      },
    create: { 
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('Post', schema);