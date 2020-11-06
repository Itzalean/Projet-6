const express = require("express");
const cors = require("cors");
const fs = require ('fs');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

// Variable globale pour le token (JSON web token)
global.privateKey = fs.readFileSync(__dirname + '/private.key');

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./models");
//db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Groupomania." });
});

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
