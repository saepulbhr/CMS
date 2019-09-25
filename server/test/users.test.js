'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Users = require('../models/users');

const should = chai.should();
chai.use(chaiHTTP);

describe('Users', function(){
    Users.collection.drop();

  // setiap habis melakukan test saya kosongkan data di collection todo
  afterEach(function(done){
    Users.collection.drop();
    done();
  });

it('seharusnya mendapatkan semua tugas yang ada di table users dengan metode POST', function(done){
    chai.request(server)
    .post('/api/users/register')
    .send({'email': 'saepu@gmail.com','password': 123, 'retypepassword': 123})
    .end(function(err, res){


    done();
    });
});
});