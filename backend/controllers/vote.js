const Vote = require("../models/Vote");
//const Post = require("../models/Post");

exports.updateVote = (req, res, next) => {
    const vote = {
        UserId: req.body.userId,
        postId: req.body.postId,
        Vote: req.body.vote
    };
    Vote.updateVote(vote, (err, data) => {
        if (err) {res.status(500).send({ message: err.message || "Erreur lors du vote" })}
        else {
            Vote.updatePost(vote.postId, (err, data) => {
                if (err) {res.status(500).send({ message: err.message || "Erreur lors du vote" })}
                else { res.send(data); }
            }
        )}
    })
}
