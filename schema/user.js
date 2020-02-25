const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const user = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    pseudo:{
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
      required : true
    },
    adress: {
      type: String,
      required: true
    },
    tel:{
      type: Number,
      required: true
    },
    isAdmin:{
      type: Boolean,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

user.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User", user);