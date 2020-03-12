const post = require('./post/lib.js');

module.exports = function (app) {
    app.post('/create',post.create);
    ///app.delete('/delete',post.delete);
    app.patch('/update',post.update);
    app.get('/:postId',post.get);
    app.get('/get/allPost',post.getAllPost);
    app.get('/allReponse/:postId',post.getAllResponse);
    app.patch('/addLike',post.addLike);
    app.patch('/deleteLike',post.deleteLike);
    app.patch('/addDislike',post.addDislike);
    app.patch('/deleteDislike',post.deleteDislike);
    app.patch('/addSignalement',post.addSignalement);
    app.patch('/deleteSignalement',post.deleteSignalement);
    app.get('/get/getAllPostSignaled/:token',post.getAllPostSignaled);
}