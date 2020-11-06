// module.exports = (sequelize, Sequelize) => {
//     const Posts = sequelize.define("Posts", {
//         Title: {type: Sequelize.STRING(255)},
//         Content: {type: Sequelize.TEXT},
//         Karma: {type: Sequelize.INTEGER(11)},
//         Type: {type: Sequelize.INTEGER(1)},
//         Deleted: {type: Sequelize.BOOLEAN, defaultValue: false}
//     });

//     return Posts;
// };

const sql = require('./index.js');

const Post = function(posts) {
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
//        console.log("created post : ", {id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
    });
}

Post.findAll = result => {
    sql.query("SELECT Posts.*, Name FROM Posts JOIN Users ON Posts.userId = Users.Id WHERE Posts.Deleted = 0 AND Users.Deleted = 0 ORDER BY createdAt DESC",
        (err,res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
//            console.log("posts: ", res);
            result(null, res);
        });
          
}

Post.findPost = (postId, result) => {
    sql.query("SELECT Posts.*, Name FROM Posts JOIN Users ON Posts.userId = Users.Id WHERE Posts.Id = ?", postId, (err, res) => {
        if (err) { console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        console.log("post: ", res);
        result({kind: "Non trouvé"});
    })
}

Post.delete = (postId, result) => {
    sql.query('DELETE FROM Posts WHERE id = ? OR postId = ?', [postId, postId], (err, res) => {
        if (err) { console.log('error: ', err);
            result(err, null);
            return
        }
        result(null, res);
    })
}

module.exports = Post;
