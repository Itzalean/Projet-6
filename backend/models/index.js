const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const db =  mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    timezone: dbConfig.TIMEZONE,
    dialect: "mysql",

});

// Ouverture de la connexion mysql
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to mysql.");
    // Création de la base de données, nécessite le privilège "CREATE"
    db.query("CREATE DATABASE IF NOT EXISTS " + dbConfig.DB, (err, result) => {
        if (err) throw err;
        console.log("Database created");
        db.database = dbConfig.DB;
        console.log("Database %s created.", dbConfig.DB);

        db.query("USE " + dbConfig.DB);

        // Création de la table des utilisateurs
        db.query("CREATE TABLE IF NOT EXISTS `Users` ( \
            `id` INT NOT NULL AUTO_INCREMENT, \
            `Name` VARCHAR(255) NOT NULL, \
            `Email` VARCHAR(255) NOT NULL, \
            `Password` VARCHAR(255) NOT NULL, \
            `Karma` BOOLEAN NOT NULL, \
            `Rank` VARCHAR(5) NOT NULL DEFAULT 'USER', \
            `Attempts` TINYINT NOT NULL DEFAULT '0', \
            `Deleted` BOOLEAN NOT NULL DEFAULT '0', \
            `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
            `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
             PRIMARY KEY (id), \
             UNIQUE (Name), \
             UNIQUE (Email) )", (err, result) => {
                if (err) throw err;
                console.log("Database Users created");
        });

        // Création de la table des posts et commentaires
        db.query("CREATE TABLE IF NOT EXISTS `Posts` ( \
            `id` INT NOT NULL AUTO_INCREMENT, \
            `Title` VARCHAR(255) NOT NULL, \
            `Content` TEXT NOT NULL, \
            `Karma` INT NOT NULL, \
            `Type` INT NOT NULL, \
            `Deleted` BOOLEAN NOT NULL DEFAULT '0', \
            `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
            `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, \
            `userId` INT NOT NULL, \
            `postId` INT DEFAULT NULL, \
            PRIMARY KEY (`Id`), \
            INDEX (userId), \
            FOREIGN KEY (userId) REFERENCES Users(Id) ON DELETE CASCADE, \
            INDEX (postId), \
            FOREIGN KEY (postId) REFERENCES Posts(Id) ON DELETE CASCADE ON UPDATE CASCADE)",
            (err, result) => {
                if (err) throw err;
                console.log("Database Posts created");
        });

        // Création de la table des likes / dislikes
        db.query("CREATE TABLE IF NOT EXISTS `Votes` ( \
            `userId` INT(11) NOT NULL, \
            `postId` INT(11) NOT NULL, \
            `Vote` TINYINT NOT NULL, \
            UNIQUE KEY `voteId` (`userId`,`postId`) USING BTREE, \
            KEY `postId` (`postId`), \
            FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)",
            (err, result) => {
                if (err) throw err;
                console.log("Database Votes created");
        });
    })
});

module.exports = db;
