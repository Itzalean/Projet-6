//const { users, sequelize } = require("../models");
const Post = require("../models/Post");
//const Post = db.posts;
// const User = db.users;
// const Op = db.Sequelize.Op;

exports.createPost = (req, res) => {
	const post = {
        UserId: req.body.userId,
        Title: req.body.Title,
        Content: req.body.Content,
        Karma: 0,
        Type: req.body.Type
        };
        Post.createPost(post, (err, data) => {
            if (err) {res.status(500).send({ message: err.message || "Erreur lors de la création" })}
            else { res.send(data); }
        })
// Post.create(post)
    //     .then(data => { res.send(data);})
    //     .catch(err => {res.status(500).send({message: err.message || "Erreur lors de la création"})})
}

exports.updatePost = (req, res) => {
    Post.update(req.body, {where: {id: req.params.id}})
        .then(() => res.status(200).json({message: "Post mis à jour"}))
        .catch(error => res.status(400).json({ error }))
};

exports.deletePost = (req, res) => {
    Post.delete(req.params.id, (err, data) => {
        if (err) {res.status(500).send({ message: err.message || "Erreur lors de la suppression"})}
        else { res.send(data); }
    })
        // .then(() => res.status(200).json({ message: "Post supprimé"}))
        // .catch(error => res.status(400).json({ srror }))
};

exports.getPost = (req, res) => {
    Post.findPost(req.params.id, (err, data) => {
        // .then(data => res.send(data))
        // .catch(err => res.status(500).send({message: "Post introuvable"}))
        if (err) res.status(500).send({message:
            err.message || "Une erreur est survenue lors de la lecture do post."
        })
        else res.send(data);
        // .then(data => res.send(data))
        // .catch(error => res.status(400).json({ error }))
    // })
    })
};

exports.getAllPosts = (req, res) => {
    Post.findAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
    // sequelize.query("SELECT Posts.*, Name FROM Posts JOIN Users ON Posts.userId = Users.Id WHERE Posts.Deleted = 0 AND Users.Deleted = 0 ORDER BY createdAt DESC",
    //     { type: sequelize.QueryTypes.SELECT })
    //     .then(data => res.send(data))
    //     .catch(err => res.status(500).send({message: err.message || "Une erreur est survenue lors de la lecture des posts."}))
}

exports.likePost = (req, res, next) => {

}
