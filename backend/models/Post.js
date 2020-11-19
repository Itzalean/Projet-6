const { deletePost } = require('../controllers/post.js');
const sql = require('./index.js');

const Post = function(post) {
    this.id = post.Id;
    this.Title = post.Title;
    this.Content = post.Content;
    this.Karma = post.Karma;
    this.Type = post.Type;
    this.Deleted = post.Deleted;
    this.createdAt = post.Created;
    this.updatedAt = post.Updated;
};

Post.createPost = (newPost, result) => {
    sql.query('INSERT INTO Posts SET ?', newPost, (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newPost});
    });
}

Post.update = (updatedPost, result) => {
    const id = updatedPost.postId;
    delete updatedPost.postId;
    sql.query("UPDATE Posts SET ?, updatedAt = now() \
        WHERE id = ?", [updatedPost, id], (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        }
        result(null, {id: id, ...updatedPost});
    })
}

Post.findAll = (pUser, result) => {
    sql.query("SELECT Posts.*, Name, COALESCE(Vote, 0) AS vote FROM Posts \
        JOIN Users ON Posts.userId = Users.Id \
        LEFT JOIN Votes ON Votes.userId = ? AND Votes.postId = Posts.id \
        WHERE Posts.postId IS NULL \
        ORDER BY createdAt DESC", pUser,
        (err,res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res);
        });
}

Post.findPost = (params, result) => {
    sql.query("SELECT Posts.*, Name, COALESCE(Vote, 0) AS vote FROM Posts \
    JOIN Users ON Posts.userId = Users.Id \
    LEFT JOIN Votes ON Votes.userId = ? AND Votes.postId = Posts.id \
    WHERE Posts.Id = ? OR Posts.postId = ? \
    ORDER BY postId, updatedAt DESC", [params.userId, params.id, params.id], (err, res) => {
        if (err) { console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        console.log("post: ", res);
        result({kind: "Non trouvé"});
    })
}

Post.delete = (postId, result) => {
    sql.query('DELETE FROM Posts WHERE id = ?', postId, (err, res) => {
        if (err) { console.log('error: ', err);
            result(err, null);
            return
        }
        result(null, res);
    })
}

// Création d'un commentaire. Relit l'enregistrement pour récupérer les informations générées lors de la création
Post.createComment = (newComment, result) => {
    sql.query('INSERT INTO Posts SET ?', newComment, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            sql.query('SELECT * FROM Posts WHERE id = ?', res.insertId, (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                result(null, res);
            })
        }
    });
}

module.exports = Post;
