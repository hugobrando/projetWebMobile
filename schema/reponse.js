const mongoose = require('mongoose');

const schema = mongoose.Schema({
    libelle : String,
    like : [user],
    dislike : [user],
    nbSignalement : [user],   
})

module.exports = mongoose.model('reponse', schema);