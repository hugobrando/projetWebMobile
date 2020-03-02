const Notification = require("../../schema/notification.js");
const User = require("../../schema/user.js");
const Post = require("../../schema/post.js");
const jwt = require("jwt-simple");
const config = require("../../config/config");


async function update(req, res) {
    const { notificationId } = req.body;
    if (!notificationId) {
      //Le cas où les infos sont vide
      return res.status(400).json({
        text: "Requête invalide"
      });
    }

    try {
      const notification = await Notification.findOne({ _id: notificationId });
      if (notification){
        notification.vue = false;

        await notification.save();
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

async function getAllNotification(req, res) {
    const { token } = req.params;
    if (!token) {
      //Le cas où ya pas de param
      return res.status(400).json({
        text: "Requête invalide"
      });
    }
    try {
        const tokenDecrypt = jwt.decode(token, config.secret);
        var user = await User.findOne({ _id: tokenDecrypt._id });
        var reponseData = await createAllNotifications(user);
        return res.status(200).json(reponseData);
    } catch (error) {
        return res.status(500).json({ text: "La requête a echoué" });
    }
}




exports.update = update;
exports.getAllNotification = getAllNotification;

async function createAllNotifications(user){
    var notifications = [];
    for(var i in user.notifications){
        var notif = user.notifications[i];
        var n = await Notification.findOne({ _id: notif });
        var post = await Post.findOne({ _id: n.postId });
        n.postId = post;
        notifications.push(n);
    };
    return notifications;
}