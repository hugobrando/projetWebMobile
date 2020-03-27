const mongoose = require("mongoose");

const categorie = mongoose.Schema(
  {
    nom: {
      type: String,
      unique: true,
      required: true
    }
  }
);

module.exports = mongoose.model("Categorie", categorie);