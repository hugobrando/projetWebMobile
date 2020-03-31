const Post = require("../../schema/post.js");
const Reponse = require("../../schema/reponse.js");
const Notification = require("../../schema/notification.js");
const User = require("../../schema/user.js");
const Categorie = require("../../schema/categorie.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");



async function create(req, res) {
    const { description, libelle, token, categorie, imageUrl} = req.body;
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
    
    var post = {};
    if(imageUrl){
      post = {
        description,
        libelle,
        like,
        dislike,
        signalement,
        userId,
        categorie,
        reponses,
        imageUrl
      };
    }
    else{
      post = {
        description,
        libelle,
        like,
        dislike,
        signalement,
        userId,
        categorie,
        reponses
      };
    }
    
    
    try {

      //verification que la categorie existe bien
      const cat = await Categorie.findOne({nom: categorie});
      if(cat){
        // Sauvegarde du post en base
        const postData = new Post(post);
        const postObject = await postData.save();
        return res.status(200).json({
          text: "Succès",
          id: postObject._id
        });
      }
      else{
        return res.status(401).json({ text: "La catégorie n'existe pas" });
      } 
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async function update(req, res) {
    const { postId, description, libelle, categorie, token, imageUrl } = req.body;
    if (!postId ||!description || !libelle || !categorie || !token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
   
    
    try {
      //verification que la categorie existe bien
      const cat = await Categorie.findOne({nom: categorie});
      if(cat){
        const user= jwt.decode(token, config.secret);
        const post = await Post.findOne({ _id: postId });
        if(user._id == post.userId){ // seul le createur peut modifier sont post
          if (post){
            post.description = description;
            post.libelle = libelle;
            post.categorie = categorie;
            if(imageUrl){
              post.imageUrl = imageUrl;
            }
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
        }
        else{
          return res.status(401).json({ text: "Vous n'êtes pas autorisé !" });
        }
      }
      else{
        return res.status(401).json({ text: "La catégorie n'existe pas" });
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
        var user = await User.findOne({ _id: post.userId }).select('pseudo');
        post.userId = user;
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
  
  async function getAllResponse(req, res) {
    const { postId } = req.params;
    if (!postId) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    try {
        var post = await Post.findOne({ _id: postId });
        var reponseData = await createAllResponse(post);
        return res.status(200).json(reponseData);
    } catch (error) {
        return res.status(500).json({ text: "La requête a echoué" });
    }
    
  }

  async function getAllPost(req, res) {
    try {
        var allPost = await createAllPost();
        return res.status(200).json(allPost);
    } catch (error) {
        
        return res.status(500).json({ text: "La requête a echoué" });
    }
    
  }

  async function getAllPostSignaled(req, res) {
    const { token } = req.params;
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
      try {
        var allPost = await Post.find({ "signalement.0": { "$exists": true } }).sort({create: -1});
        for(var i in allPost){
          var post = allPost[i];
          var u = await User.findOne({ _id: post.userId }).select('pseudo');
          allPost[i].userId = u;
        };
        return res.status(200).json(allPost);
      } catch (error) {
          
          return res.status(500).json({ text: "La requête a echoué" });
      }
    }
    else{
      return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
    }
    
    
  }

  async function deletePost(req, res) {
    const { postId, token } = req.body;
    if (!postId || !token) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
      try {
        
        
        // delete toutes les notifs de ce post
        Notification.find({ postId: postId }, async function(err, data){
          console.log(data)
          for(var n in data){
            Notification.deleteOne({ _id: data[0]._id}).then(() => console.log("notification suprimé"));
            // on cherche l'user qui a poster le post pour lui suprimmer sa notif 
            var post = await Post.find({ _id: data[0].postId});
            User.find({ _id: post[0].userId},function(err, user){
              const index = user[0].notifications.indexOf(data[0]._id);
              if (index > -1) {
                user[0].notifications.splice(index, 1);
              }
              user[0].save().then(() => console.log("suprimé de la liste des notif de l'user"));
            })
          }
        }).then(() => console.log("toutes les notifications suprimmés"));
        // delete toutes les reponses de ce post
        await Post.find({ _id: postId }, function(err, data){
          for(var r in data[0].reponses){
            Reponse.deleteOne({ _id: data[0].reponses[r]}).then(() => console.log("reponse suprimmé"));
          }
        })
        // delete finalement le post
        await Post.deleteOne({ _id: postId });
        return res.status(200).json({ text: "Post suprimmé" });
      } catch (error) {
          return res.status(500).json({ text: "La requête a echoué" });
      }
    }
    else{
      return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
    }
    
  }

  async function getAllMyPosts(req, res) {
    const { token } = req.params;
    try {
      const user = jwt.decode(token, config.secret);
      var allPost = await Post.find({ "userId": user._id }).sort({create: -1});
      var u = await User.findOne({ _id: user._id }).select('pseudo');
      for(var i in allPost){
        allPost[i].userId = u;
      };
      return res.status(200).json(allPost);
    } catch (error) {
        
        return res.status(500).json({ text: "La requête a echoué" });
    }
    
  }

  async function deletePhoto(req, res) {
    const { postId, token } = req.body;
    if (!postId || !token) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    try{
      const user = jwt.decode(token, config.secret);
      if(user.isAdmin){
        var post = await Post.findOne({ _id: postId});
        post.imageUrl = undefined;
        await post.save();
        return res.status(200).json({ text: "Photo suprimmé" });
      }
      else{
        return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
      }
    }catch (error) {
      console.log(error)
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
exports.getAllResponse = getAllResponse;
exports.getAllPost = getAllPost;
exports.getAllPostSignaled = getAllPostSignaled;
exports.delete = deletePost;
exports.getAllMyPosts = getAllMyPosts;
exports.deletePhoto = deletePhoto;

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

async function createAllResponse(post){
  var reponseData = [];
  for(var i in post.reponses){
    var reponse = post.reponses[i];
    var r = await Reponse.findOne({ _id: reponse._id });
    if(r){
      var u = await User.findOne({ _id: r.userId }).select('pseudo');
      if(r){
        reponseData.push({
          like: r.like,
          dislike: r.dislike,
          signalement: r.signalement,
          _id: r._id,
          libelle: r.libelle,
          userId: u,
          create: r.create
        }); //on envoie pas la version
      }
    }
  };

  return reponseData;
}

async function createAllPost(){
  var allPost = await Post.find().sort({create: -1});
  for(var i in allPost){
    var post = allPost[i];
    var u = await User.findOne({ _id: post.userId }).select('pseudo');
    allPost[i].userId = u;
  };

  return allPost;
}


