const user  = require("user.js");
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    description : String, 
    libelle : String,
    like : [user],
    dislike : [user] ,
    nbSignalement : [user], 
    user : user, 
    categ : String,
    reponses : [Reponse]
})

module.exports = mongoose.model('post', schema);