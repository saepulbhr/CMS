const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');


const Datadate = require('../models/datadate');
chai.use(chaiHTTP);
const should = chai.should();

describe('datadate', function () {

    beforeEach(function (done) {
        let data = new Datadate({
            letter: "2017-03-31",
            frequency: 1.1
        });
        data.save(function (err) {
            done();
        })
    });

    afterEach(function (done) {
        Datadate.collection.drop();
        done();
    });

    it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/datadate/search')
            .send({
                letter: "2017-03-31",
                frequency: 1.1,
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("2017-03-31");
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it("seharusnya menampilkan semua data dengan metode GET", function (done) {
        chai.request(server)
            .get('/api/datadate/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.have.equal('2017-03-31');
                res.body[0].frequency.should.have.equal(1.1);
                done();
            })
    });

    it("seharusnya merubah satu data dengan metode PUT", (done) => {
        chai.request(server)
            .get('/api/datadate/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/datadate/' + res.body[0]._id)
                    .send({
                        letter: '2017-03-31',
                        frequency: 1.5
                    })
                    .end((err, respon) => {
                        respon.should.status(201);
                        respon.should.be.json;
                        respon.body.should.be.a('object');
                        respon.body.should.have.property('success');
                        respon.body.should.have.property('message');
                        respon.body.should.have.property('data');
                        respon.body.success.should.equal(true);
                        respon.body.message.should.equal('data have been updated');
                        respon.body.data.letter.should.equal('2017-03-31');
                        respon.body.data.frequency.should.equal(1.5);
                        done();
                    })
            })
    });

    it("seharusnya menambahkan satu datadate dengan metode POST", (done)=>{
        chai.request(server)
        .post('/api/datadate/add')
        .send({
            letter: "2019-03-31",
            frequency: 2.0
        })
        .end((err, res) =>{
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.success.should.have.equal(true);
            res.body.message.should.have.equal('data have been added');
            res.body.data.letter.should.have.equal('2019-03-31');
            res.body.data.frequency.should.have.equal(2.0);
            done();
        })
    });

    it("seharusnya menghapus satu data dengan metode DELETE", (done)=>{
        chai.request(server)
        .get('/api/datadate')
        .end((err, res)=>{
            chai.request(server)
            .delete('/api/datadate/'+ res.body[0]._id)
            .send({
                letter:"2017-03-31",
                frequency:1.1
            })
            .end((err, respon)=>{
                respon.should.have.status(201);
                respon.should.be.json;
                respon.body.should.be.a('object');
                respon.body.should.have.property('success');
                respon.body.should.have.property('message');
                respon.body.should.have.property('data');
                respon.body.success.should.have.equal(true);
                respon.body.message.should.have.equal('data have been deleted');
                respon.body.data.letter.should.have.equal('2017-03-31');
                respon.body.data.frequency.should.have.equal(1.1);
                done();
            })
        })
    });

    it("seharusnya menampilkan datu data berdasar id dengan metode GET", (done)=>{
        chai.request(server)
        .get('/api/datadate/')
        .end((er, res)=>{
            chai.request(server)
            .get('/api/datadate/' + res.body[0]._id)
            .send({
                letter: "2017-03-31",
                frequency:1.1
            })
            .end((err, respon)=>{
                respon.should.have.status(201);
                respon.should.be.json;
                respon.body.should.be.a('object');
                respon.body.should.have.property('success');
                respon.body.should.have.property('message');
                respon.body.should.have.property('data');
                respon.body.success.should.have.equal(true);
                respon.body.message.should.have.equal('data found');
                respon.body.data.letter.should.have.equal('2017-03-31');
                respon.body.data.frequency.should.have.equal(1.1);
                done();
            })
        })
    });

});