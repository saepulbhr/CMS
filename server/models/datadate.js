const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datadateSchema = new Schema({
    letter :{
        type: String
    },
    frequency: {
        type: Number
    }
})

module.exports = mongoose.model('datadate', datadateSchema);