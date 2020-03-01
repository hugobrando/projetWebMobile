const Post = require("../../schema/post.js");
const Reponse = require("../../schema/reponse.js");
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
      // Sauvegarde de l'utilisateur en base
      const reponseData = new Reponse(reponse);
      const reponseObject = await reponseData.save();
      const post = await Post.findOne({ _id: postId });
      post.reponses.push(reponseObject);
      await post.save();
      return res.status(200).json({
        text: "Succès",
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
    const { reponse, token } = req.body;
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
        return res.status(400).json({
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

