
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Datadate = require('../models/datadate');

mongoose.connect('mongodb://localhost:27017/cmsdb', { useNewUrlParser: true, useFindAndModify: false })

let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
// console.log(data)

Datadate.insertMany(data, (err) => {
  if (err) throw (err)
})
