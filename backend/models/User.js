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
        newUser.id = res.insertId;
        result(null, {...newUser});
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
