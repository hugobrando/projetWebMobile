const notification = require('./notification/lib.js');

module.exports = function (app) {
    app.patch('/vue',notification.update);
    app.get('/:notificationId',notification.get);
    app.get('/allNotification/:token',notification.getAllPost)
}