const Post = require("../../schema/post.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");



async function create(req, res) {
    const { description, libelle, token, categorie} = req.body;
    if (!description || !libelle || !token || !categorie) {
      //Verif des infos qui arivent
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    // Création d'un objet user, dans lequel on hash le mot de passe
    const like = [];
    const dislike = [];
    const signalement = [];
    const reponses = [];
    const userId = jwt.decode(token, config.secret);

    const post = {
      description,
      libelle,
      like,
      dislike,
      signalement,
      userId,
      categorie,
      reponses
    };
    
    try {
      // Sauvegarde de l'utilisateur en base
      const postData = new Post(post);
      await postData.save();
      return res.status(200).json({
        text: "Succès",
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async function update(req, res) {
    const { postId, description, libelle, categorie } = req.body;
    if (!postId ||!description || !libelle || !categorie) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const post = await Post.findOne({ _id: postId });
      if (post){
        post.description = description;
        post.libelle = libelle;
        post.categorie = categorie;

        await post.save();
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
    const { postId } = req.params;
    if (!postId) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    try {
        var post = await Post.findOne({ _id: postId });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ text: "La requête a echoué" });
    }
    
  }

  async function addLike(req, res) {
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (!alreadyLike(userId,post) && !alreadyDislike(userId,post)){
        post.like.push(userId);
        await post.save();
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
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (alreadyLike(userId,post)){
        post.like.splice(post.like.indexOf(userId._id), 1);
        await post.save();
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
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (!alreadyDislike(userId,post) && !alreadyLike(userId,post)){
        post.dislike.push(userId);
        await post.save();
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
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (alreadyDislike(userId,post)){
        post.dislike.splice(post.dislike.indexOf(userId._id), 1);
        await post.save();
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
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (!alreadySignaled(userId,post)){
        post.signalement.push(userId);
        await post.save();
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
    const { postId, token } = req.body;
    if (!postId ||!token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      const userId = jwt.decode(token, config.secret);
      const post = await Post.findOne({ _id: postId });
      if (alreadySignaled(userId,post)){
        post.signalement.splice(post.signalement.indexOf(userId._id), 1);
        await post.save();
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

function alreadyLike(userId,post){
    var already = false
    post.like.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}


function alreadyDislike(userId,post){
    var already = false
    post.dislike.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}

function alreadySignaled(userId,post){
    var already = false
    post.signalement.forEach(function(item) {
        if(item.equals(userId._id)){
            already = true;
        }
      });
      return already;
}

