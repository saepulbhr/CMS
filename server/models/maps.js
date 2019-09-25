const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const mapsScheama = new Schema({
    title:{
        type: String
    },
    lat:{
        type: Number
    },
    lng:{
        type: Number
    }
})

module.exports = mongoose.model('maps', mapsScheama);