const Post = require("../models/Post");

const fs = require ('fs');

exports.createPost = (req, res) => {
    const postObject = req.body.post ? JSON.parse(req.body.post) : req.body;

	const post = {
        UserId: postObject.userId,
        Title: postObject.Title,
        Content: postObject.Content,
        Karma: 0,
        Type: postObject.Type
        };
        post.Type === 1 ? post.Content = `${req.protocol}://${req.get("host")}/images/${req.file.filename} ` : post.Content = post.Content
        Post.createPost(post, (err, data) => {
            if (err) {res.status(500).send({ message: err.message || "Erreur lors de la création du post" })}
            res.send(data);
        })
}

exports.updatePost = (req, res) => {
    const postObject = req.body.post ? JSON.parse(req.body.post) : req.body;

    if (postObject.Content || req.body.post) {
        postObject.Type === 1 ? postObject.Content = `${req.protocol}://${req.get("host")}/images/${req.file.filename} ` : postObject.Content = postObject.Content
    }
    Post.update(postObject, (err, data) => {
        if (err) {res.status(500).send({ message: err.message || "Erreur lors de la mise à jour"})}
        else { res.send(data); }
    })
};

exports.deletePost = (req, res) => {
    Post.delete(req.params.id, (err, data) => {
        if (err) {res.status(500).send({ message: err.message || "Erreur lors de la suppression"})}
        else { res.send(data); }
    })
};

exports.getPost = (req, res) => {
    Post.findPost(req.params, (err, data) => {
        if (err) res.status(500).send({message:
            err.message || "Une erreur est survenue lors de la lecture du post."
        })
        else res.send(data);
    })
};

exports.getAllPosts = (req, res) => {
    const pUser = req.params.userId;
    Post.findAll(pUser, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Une erreur est survenue lors de la lecture des posts."
          });
        else res.send(data);
      });
}
