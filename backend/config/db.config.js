module.exports = {
    HOST: "localhost",
    USER: "groupomania",
    PASSWORD: "groupomania",
    DB: "Groupomania",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
