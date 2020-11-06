const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res) => {
    // Chiffrement + sel pour le mot de passe
    bcrypt.hash(req.body.password, 12)
        .then(hash => {
            const user = new User({
                Name: req.body.name,
                Email: req.body.email,
                Password: hash,
                Karma: 0,
                Rank: "USER"
            });
            User.createUser(user, (err, data) => {
                if (err) {res.status(500).send({ message: err.message })}
                else { res.send(data); }
            })
        })
        .catch(error => res.status(500).send({message: error.message}));
}

exports.login = (req, res) => {
    User.findUser({ Name: req.body.name }, (err, data) => {
    	if (err || data.length == 0) {
            res.status(500).send({
                message: "Erreur de connexion."})
        } else {
            bcrypt.compare(req.body.password, data[0].Password)
    			.then(valid => {
    				if (!valid) {
    					return res.status(401).json({ message: 'Erreur de connexion.' });
    				}
    				res.status(200).json({
                        // Pseudo: data[0].Name,
                        Name: data[0].Name,
                        Id: data[0].id,
                        Rank: data[0].Rank,

    					token: jwt.sign(
    						{ userId: data[0].Id },
    						'RANDOM_TOKEN_SECRET',
    						{ expiresIn: '1h'}
    					)
    				});
    			})
    			.catch(error => res.status(500).json({ error }));
    	}
    })
};
