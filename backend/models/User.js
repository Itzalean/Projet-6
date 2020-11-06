// module.exports = (sequelize, Sequelize) => {
//     const Users = sequelize.define("Users", {
// //        Id: {type: Sequelize.INTEGER(11)},
//         Name: {type: Sequelize.STRING(255), unique: true},
//         Email: {type: Sequelize.STRING(255), unique: true},
//         Password: {type: Sequelize.STRING(255)},
//         Karma: {type: Sequelize.INTEGER},
//         Rank: {type: Sequelize.STRING(5)},
//         Deleted: {type: Sequelize.BOOLEAN, defaultValue: false}
//     });

//     return Users;
// };

const sql = require('./index.js');

const User = function(user) {
    this.id = user.id;
    this.Name = user.Name;
    this.Email = user.Email;
    this.Password = user.Password;
    this.Karma = user.Karma;
    this.Rank = user.Rank;
};

User.createUser = (newUser, result) => {
    sql.query('INSERT INTO Users SET ?', newUser, (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        }
//        console.log("created user : ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findUser = (loginUser, result) => {
    sql.query('SELECT * FROM Users WHERE Name = ?', [loginUser.Name], (err, res) => {
        if (err) { console.log('error : ', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;
