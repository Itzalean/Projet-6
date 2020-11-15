const { _handleNetworkError } = require("../models");
const Comment = require("../models/Post");

exports.addComment = (req, res) => {
	const comment = {
        UserId: req.body.userId,
        Title: req.body.Title,
        Content: req.body.Content,
        Karma: 0,
        Type: req.body.Type,
        postId: req.body.postId
        };
        Comment.createComment(comment, (err, data) => {
            if (err) {res.status(500).send({ message: err.message || "Erreur lors de la création du commentaire" })}
            else { res.send(data); }
        })
}

exports.updateComment = (req, res) => {
    const comment = {
        postId: req.body.postId,
        Title: req.body.Title,
        Content: req.body.Content,
    };
    Comment.update(comment, (err, data) => {
        if (err) {res.status(500).send({ message: err.message || "Erreur lors de la mise à jour du commentaire" })}
        else { res.send(data); }
    })
}