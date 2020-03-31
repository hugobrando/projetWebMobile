const post = require('./categorie/lib.js');

module.exports = function (app) {
    app.post('/create',post.create);
    app.get('/get/allCategorie',post.getAllCategorie);
}