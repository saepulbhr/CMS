var jwt = require('jsonwebtoken');
var secret = require('../helper/config')
// var Users = require('../models/users')

module.exports = {
    token: (id) => {
        return jwt.sign({
            data: { id: id }
        }, secret.secret, { expiresIn: '1h' })
    }
}
