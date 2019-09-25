const jwt = require('jsonwebtoken');
var Users = require('../models/users')
var secret = require('../helper/config')

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, secret.secret, (err, encoded) => {
        if (err) {
            res.status(401).json({ messages: 'Invalid token' })
        } else {
            Users.findOne({
                id: encoded._id
            }).then(user => {
                if (user) {
                    next();
                }
            })
        }
    })
}

module.exports = auth