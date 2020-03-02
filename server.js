//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Connexion à la base de donnée
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/mernapp", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Définition du routeur
const routerUser = express.Router();
app.use("/user", routerUser);
require(__dirname + "/controllers/userController")(routerUser);
const routerPost = express.Router();
app.use("/post", routerPost);
require(__dirname + "/controllers/postController")(routerPost);
const routerReponse = express.Router();
app.use("/reponse", routerReponse);
require(__dirname + "/controllers/reponseController")(routerReponse);
const routerNotification = express.Router();
app.use("/notification", routerNotification);
require(__dirname + "/controllers/notificationController")(routerNotification);

//Définition et mise en place du port d'écoute
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}`));
