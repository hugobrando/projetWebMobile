const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.patch('/edit',account.edit);
    app.get('/info/:token',account.info);
    app.get('/isAdmin/:token',account.isAdmin);
}