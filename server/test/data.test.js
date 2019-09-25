const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Data = require('../models/data');
const should = chai.should();

chai.use(chaiHTTP);

describe('data', function () {

    beforeEach(function (done) {
        let data = new Data({
            letter: "A",
            frequency: 1.1
        });
        data.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Data.collection.drop();
        done();
    });

    it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                letter: "A",
                frequency: 1.1,
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("A");
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it("Seharusnya sistem menampilkan semua nilai dalam tabel data dengan metode GET", (done) => {
        chai.request(server)
            .get('/api/data/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id')
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it("seharusnya menabahkan satu data dengan metode POST", (done) => {
        chai.request(server)
            .post('/api/data/add/')
            .send({
                letter: "A",
                frequency: 1.1
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.have.equal('data have been added');
                res.body.data.letter.should.equal('A');
                res.body.data.frequency.should.equal(1.1);
                done();
            });
    });


    it("seharusnya merubah satu data dengan metode PUT", (done) => {
        chai.request(server)
            .get('/api/data/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/data/' + res.body[0]._id)
                    .send({
                        letter: 'A',
                        frequency: 2.8
                    })
                    .end((err, respon) => {
                        respon.should.status(201);
                        respon.should.be.json;
                        respon.body.should.be.a('object');
                        respon.body.should.have.property('success');
                        respon.body.should.have.property('message');
                        respon.body.should.have.property('data');
                        respon.body.success.should.equal(true);
                        respon.body.message.should.equal('data have been update');
                        respon.body.data.letter.should.equal('A');
                        respon.body.data.frequency.should.equal(2.8);
                        done();
                    })
            });
    });

    it("seharusnya menghapus satu data dengan metode delete", (done) => {
        chai.request(server)
        .get('/api/data/')
        .end((err, res) => {
            chai.request(server)
                .delete('/api/data/' + res.body[0]._id)
                .send({
                    letter: 'A',
                    frequency: 2.8
                })
                .end((err, respon) => {
                    respon.should.status(201);
                    respon.should.be.json;
                    respon.body.should.be.a('object');
                    respon.body.should.have.property('success');
                    respon.body.should.have.property('message');
                    respon.body.should.have.property('data');
                    respon.body.success.should.equal(true);
                    respon.body.message.should.equal('data have been deleted');
                    respon.body.data.letter.should.equal('A');
                    respon.body.data.frequency.should.equal(1.1);
                    done();
                })
        });
    });

    it("seharusnya menampilkan satu data denga id dan metode GET", (done)=>{
        chai.request(server)
        .get('/api/data/')
        .end((err, res)=>{
            chai.request(server)
            .get('/api/data/'+ res.body[0]._id)
            .send({
                letter: "A",
                frequency: 1.1
            })
            .end((err, respon)=>{
                respon.should.status(201);
                respon.should.be.json;
                respon.body.should.be.a('object');
                respon.body.should.have.property('success');
                respon.body.should.have.property('message');
                respon.body.should.property('data');
                respon.body.success.should.equal(true);
                respon.body.message.should.equal('data found');
                respon.body.data.letter.should.equal("A");
                respon.body.data.frequency.should.equal(1.1);
                done();
            });
        });
    });
});