const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: { type: String },
    password: { type: String },
    fullname: {type: String},
    token: { type: String }
});

module.exports = mongoose.model('users', usersSchema);