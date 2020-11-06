const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.posts = require("./Post.js")(sequelize, Sequelize);
// db.users = require("./User.js")(sequelize, Sequelize);

// db.users.hasMany(db.posts);
// db.posts.belongsTo(db.users);
// db.posts.hasMany(db.posts);

// module.exports = db;

// const mysql = require('mysql2');
// const dbConfig = require("../config/db.config.js");

const db =  mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD
//    database: dbConfig.DB
});

// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to mysql.");
    db.query("CREATE DATABASE IF NOT EXISTS " + dbConfig.DB, (err, result) => {
        if (err) throw err;
        console.log("Database created");
        db.database = dbConfig.DB;
        console.log("Database %s created.", dbConfig.DB);

        db.query("USE " + dbConfig.DB);

        db.query("CREATE TABLE IF NOT EXISTS `Users` ( " +
            "`id` INT NOT NULL AUTO_INCREMENT, " +
            "`Name` VARCHAR(255) NOT NULL, " +
            "`Email` VARCHAR(255) NOT NULL, " +
            "`Password` VARCHAR(255) NOT NULL, " +
            "`Karma` BOOLEAN NOT NULL, " +
            "`Rank` VARCHAR(5) NOT NULL DEFAULT 'USER', " +
            "`Deleted` BOOLEAN NOT NULL DEFAULT '0', " +
            "`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
            "`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
            " PRIMARY KEY (id), " +
            " UNIQUE (Name), " +
            " UNIQUE (Email) )", (err, result) => {
                if (err) throw err;
                console.log("Database Users created");
        });

        db.query("CREATE TABLE IF NOT EXISTS `Posts` ( " +
            "`id` INT NOT NULL AUTO_INCREMENT, " +
            "`Title` VARCHAR(255) NOT NULL, " +
            "`Content` TEXT NOT NULL, " +
            "`Karma` INT NOT NULL, " +
            "`Type` INT NOT NULL, " +
            "`Deleted` BOOLEAN NOT NULL DEFAULT '0', " +
            "`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
            "`updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
            "`userId` INT NOT NULL, " +
            "`postId` INT DEFAULT NULL, " +
            "PRIMARY KEY (`Id`), " +
            "INDEX (userId), " +
            "FOREIGN KEY (userId) REFERENCES Users(Id) ON DELETE CASCADE, " +
            "INDEX (postId), " +
            "FOREIGN KEY (postId) REFERENCES Posts(Id) ON DELETE CASCADE ON UPDATE CASCADE)", (err, result) => {
                if (err) throw err;
                console.log("Database Posts created");
        });
    })
});

module.exports = db;
