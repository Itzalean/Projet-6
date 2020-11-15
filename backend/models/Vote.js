const sql = require('./index.js');

const Vote = function(vote) {
    this.userId = vote.userId;
    this.postId = vote.postId;
    this.Vote = vote.Vote;
};

Vote.updateVote = (newVote, result) => {
    sql.query('REPLACE INTO Votes SET ?', newVote, (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }}
    );
}

Vote.updatePost = (postId, result) => {
    sql.query('UPDATE Posts SET karma = ( \
            SELECT SUM(Vote) from Votes \
            WHERE Votes.postId = ?) \
        WHERE Posts.id = ?', [postId, postId], (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    })
}

module.exports = Vote;
