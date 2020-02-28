const mongoose = require('mongoose');

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
    nbSignalement : {
        type: [ObjectId],
        required: true
      }   
})

module.exports = mongoose.model('reponse', schema);