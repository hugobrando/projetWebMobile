const notification = require('./notification/lib.js');

module.exports = function (app) {
    app.patch('/vue',notification.update);
    app.get('/allNotification/:token',notification.getAllNotification)
}