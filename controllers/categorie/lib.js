const Categorie = require("../../schema/categorie.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");

async function create(req, res) {
    const { nom, token } = req.body;
    if ( !nom || !token ) {
      //Verif des infos qui arivent
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
        const categorie = {
            nom
        };
        try {
        //on verifie qu'elle n'existe pas déjà
        const cat = await Categorie.findOne({nom});
        if(!cat){
            // Sauvegarde de la categorie en base
            const categorieData = new Categorie(categorie);
            const categorieObject = await categorieData.save();
            return res.status(200).json({
                text: "Succès",
            });
        }
        else{
            return res.status(400).json({
                text: "La catégorie existe déjà"
              });
        }
        } catch (error) {
        return res.status(500).json({ error });
        }
    }
    else{
        return res.status(401).json({ text: "Vous n'êtes pas autorisé" });
    }
    
  }


  async function getAllCategorie(req, res) {
    const { token } = req.params;
    const user = jwt.decode(token, config.secret);
    if(user.isAdmin){
      try {
        var allCategorie = await Categorie.find();
        return res.status(200).json(allCategorie);
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
exports.getAllCategorie = getAllCategorie;

