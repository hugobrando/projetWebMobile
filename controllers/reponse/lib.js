const Post = require("../../schema/post.js");
const Reponse = require("../../schema/reponse.js");
const User = require("../../schema/user.js");
const Notification = require("../../schema/notification.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");



async function create(req, res) {
    const { libelle, token, postId } = req.body;
    if ( !libelle || !token || !postId) {
      //Verif des infos qui arivent
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    // Création d'un objet user, dans lequel on hash le mot de passe
    const like = [];
    const dislike = [];
    const signalement = [];
    const userId = jwt.decode(token, config.secret);

    const reponse = {
      libelle,
      like,
      dislike,
      signalement,
      userId,
    };
    try {
      // Sauvegarde de la reponse en base
      const reponseData = new Reponse(reponse);
      const reponseObject = await reponseData.save();
      //Sauvegarde de la reponse dans le post 
      const post = await Post.findOne({ _id: postId });
      post.reponses.push(reponseObject);
      await post.save();
      //Sauvegarde de la notification
      const userOfPost = await User.findOne({ _id: post.userId });
      if(!(await alreadyNotif(userOfPost,postId))){ //on regarde que la notif n'a pas deja été créé par une autre reponse (si oui on remet la donnée vu a false)
        console.log("création notif")  ;
        const vue = false;
        const notif = {
          postId,
          vue
        };
        const notifData = new Notification(notif);
        const reponseObject = await notifData.save();
        // Sauvegarde de la notif pour l'user du post
        userOfPost.notifications.push(reponseObject);
        userOfPost.save();
      }
      return res.status(200).json({
        text: "Succès",
        id: reponseObject._id
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async function update(req, res) {
    const { reponseId, libelle } = req.body;
    if (!reponseId ||!libelle) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (reponse){
        reponse.libelle = libelle;

        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "La requête de modification a echoué"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }
  

  async function get(req, res) {
    const { reponseId } = req.params;
    if (!reponseId) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    try {
        var reponse = await Reponse.findOne({ _id: reponseId });
        var user = await User.findOne({ _id: reponse.userId }).select('pseudo');
        reponse.userId = user;
        return res.status(200).json(reponse);
    } catch (error) {
        return res.status(500).json({ text: "La requête a echoué" });
    }
    
  }

  async function addLike(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (!alreadyLike(userId,reponse) && !alreadyDislike(userId,reponse)){
        reponse.like.push(userId);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "Vous avez déjà liké ou disliké !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }

  
  async function deleteLike(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (alreadyLike(userId,reponse)){
        reponse.like.splice(reponse.like.indexOf(userId._id), 1);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "Vous n'avez pas liké !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }

  
  async function addDislike(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (!alreadyDislike(userId,reponse) && !alreadyLike(userId,reponse)){
        reponse.dislike.push(userId);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(401).json({
          text: "Vous avez déjà disliké ou liké !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }

  
  async function deleteDislike(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (alreadyDislike(userId,reponse)){
        reponse.dislike.splice(reponse.dislike.indexOf(userId._id), 1);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "Vous n'avez pas disliké !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }

   
  async function addSignalement(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (!alreadySignaled(userId,reponse)){
        reponse.signalement.push(userId);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "Vous avez déjà signalé !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }

  
  async function deleteSignalement(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const reponse = await Reponse.findOne({ _id: reponseId });
      if (alreadySignaled(userId,reponse)){
        reponse.signalement.splice(reponse.signalement.indexOf(userId._id), 1);
        await reponse.save();
        return res.status(200).json({
          text: "Succès",
        });
      }
      else{
        return res.status(400).json({
          text: "Vous n'avez pas signalé !"
        });
      }
      
    } catch (error) {
      return res.status(500).json({ text: "La requête a echoué" });
    }
  }



  
  async function deleteReponse(req, res) {
    const { reponseId, token } = req.body;
    if (!reponseId || !token) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
      try {
        // delete la reponse dans la liste des reponses de son post
        await Post.find({ reponses: reponseId }, function(err, data){
          const index = data[0].reponses.indexOf(reponseId);
              if (index > -1) {
                data[0].reponses.splice(index, 1);
              }
              data[0].save().then(() => console.log("suprimé de la liste des reponses du post"));
        })
        // delete finalement le post
        await Reponse.deleteOne({ _id: reponseId });
        return res.status(200).json({ text: "Reponse suprimmé" });
      } catch (error) {
          return res.status(500).json({ text: "La requête a echoué" });
      }
    }
    else{
      return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
    }
    
  }

  async function getAllReponseSignaled(req, res) {
    const { token } = req.params;
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
      try {
        var allReponse = await Reponse.find({ "signalement.0": { "$exists": true } }).sort({create: -1});
        for(var i in allReponse){
          var post = allReponse[i];
          var u = await User.findOne({ _id: post.userId }).select('pseudo');
          allReponse[i].userId = u;
        };
        return res.status(200).json(allReponse);
      } catch (error) {
          
          return res.status(500).json({ text: "La requête a echoué" });
      }
    }
    else{
      return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
    }
    
    
  }


  //On exporte nos fonctions
  
exports.create = create;
exports.update = update;
exports.get = get;
exports.addLike = addLike;
exports.deleteLike = deleteLike;
exports.addDislike = addDislike;
exports.deleteDislike = deleteDislike;
exports.addSignalement = addSignalement;
exports.deleteSignalement = deleteSignalement;
exports.delete = deleteReponse;
exports.getAllReponseSignaled = getAllReponseSignaled;



//fonction interne

function alreadyLike(userId,reponse){
    var already = false
    reponse.like.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}


function alreadyDislike(userId,reponse){
    var already = false
    reponse.dislike.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}

function alreadySignaled(userId,reponse){
    var already = false
    reponse.signalement.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}

async function alreadyNotif(user,postId){
  var already = false;
  
  for(var i in user.notifications){
    var notification = user.notifications[i];
    var n = await Notification.findOne({ _id: notification });
    if(n){
      if(n.postId.equals(postId)){
        if(n.vue){
          n.vue = false;
          n.save();
        }
        already = true;
      }
    }
  };

  return already;
}

