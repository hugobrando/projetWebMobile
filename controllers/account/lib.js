const User = require("../../schema/user.js");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../../config/config");


async function signup(req, res) {
  const { password, email, pseudo, firstname, lastname, birthday, adress, tel } = req.body;
  if (!email || !password || !pseudo || !firstname || !lastname || !birthday || !adress || !tel) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const isAdmin = false;
  const user = {
    email,
    password: passwordHash.generate(password),
    pseudo,
    firstname,
    lastname,
    birthday,
    adress,
    tel,
    isAdmin
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken(),
      nom: firstname,
      prenom: lastname,
      _id: userObject._id
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      return res.status(400).json({
        text: "Requête invalide:" + email + ": email: " + password
      });
    }
    try {
      // On check si l'utilisateur existe en base
      const findUser = await User.findOne({ email });
      if (!findUser)
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      if (!findUser.authenticate(password))
        return res.status(401).json({
          text: "Mot de passe incorrect"
        });
      return res.status(200).json({
        token: findUser.getToken(),
        nom: findUser.firstname,
        prenom: findUser.lastname,
        _id: findUser._id,
        text: "Authentification réussi"
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }


async function edit(req, res) {
  const { token, email, pseudo, firstname, lastname, birthday, adress, tel } = req.body;
  if (!token || !email || !pseudo || !firstname || !lastname || !birthday || !adress || !tel) {
    //Le cas où les infos sont vide
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
 
  // On check en base si l'utilisateur existe déjà
  try {
    const oldUser = jwt.decode(token, config.secret);

    const email = oldUser.email;
    const findUser = await User.findOne({ email });
      if (!findUser)
        
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
  } catch (error) {
    return res.status(500).json({ error });
  }
  const newEmail = email;
  try {
    const oldUser = jwt.decode(token, config.secret);

    const email = oldUser.email;
    const user = await User.findOne({ email });
    if (user){
      user.email = newEmail;
      user.pseudo = pseudo;
      user.firstname = firstname;
      user.birthday = birthday; 
      user.adress = adress;
      user.tel = tel;
      const userObject = await user.save();
      return res.status(200).json({
        text: "Succès",
        token: userObject.getToken(),
        nom: firstname,
        prenom: lastname,
        _id: userObject._id
      });
    }
    else{
      return res.status(400).json({
        text: "La requête a echoué"
      });
    }
    
  } catch (error) {
    return res.status(500).json({ text: "La requête a echoué" });
  }
}


async function info(req, res) {
  const { token } = req.params;
  if (!token) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  const user = jwt.decode(token, config.secret);
  return res.status(200).json({
    text: "Succès",
    email: user.email,
    pseudo: user.pseudo,
    firstname: user.firstname,
    lastname: user.lastname,
    birthday: user.birthday,
    adress: user.adress,
    tel: user.tel
  });
}
  
  
//On exporte nos fonctions

exports.login = login;
exports.signup = signup;
exports.edit = edit;
exports.info = info;