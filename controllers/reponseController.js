const reponse = require('./reponse/lib.js');

module.exports = function (app) {
    app.post('/create',reponse.create);
    app.delete('/delete',reponse.delete);
    app.patch('/update',reponse.update)
    app.get('/:reponseId',reponse.get)
    app.patch('/addLike',reponse.addLike)
    app.patch('/deleteLike',reponse.deleteLike)
    app.patch('/addDislike',reponse.addDislike)
    app.patch('/deleteDislike',reponse.deleteDislike)
    app.patch('/addSignalement',reponse.addSignalement)
    app.patch('/deleteSignalement',reponse.deleteSignalement)
}