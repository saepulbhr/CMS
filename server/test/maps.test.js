
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');

const Maps = require('../models/maps');


chai.use(chaiHTTP);

describe('maps', () => {

    beforeEach((done) => {
        let data = new Maps({
            title: 'Trans Studio Mall',
            lat: -6.9261257,
            lng: 107.6343728
        });
        data.save((err) => {
            done();
        })
    })

    afterEach((done) => {
        Maps.collection.drop();
        done();
    });

    it("seharusnya sistem mengembalika nilai title, lat, lng dengan metode GER", (done) => {
        chai.request(server)
            .post('/api/maps/search')
            .send({
                title: 'Trans Studio Mall',
                lat: -6.9261257,
                lng: 107.6343728
            }).end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat')
                res.body[0].should.have.property('lng');
                res.body[0].title.should.equal("Trans Studio Mall");
                res.body[0].lat.should.equal(-6.9261257);
                res.body[0].lng.should.equal(107.6343728)
                done();
            });
    });

    it("seharusnya menampilkan data maps dengan metode GET", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].title.should.equal("Trans Studio Mall");
                res.body[0].lat.should.equal(-6.9261257);
                res.body[0].lng.should.equal(107.6343728);
                done();
            })
    });

    it("seharusnya merubah satu data dengan metode PUT", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/maps/' + res.body[0]._id)
                    .send({
                        title: 'Trans Studio Mall',
                        lat: -6.9261257,
                        lng: 107.6343728
                    })
                    .end((err, respon) => {
                        respon.should.have.status(201);
                        respon.should.be.json;
                        respon.body.should.be.a('object');
                        respon.body.should.have.property('success');
                        respon.body.should.have.property('message');
                        respon.body.should.have.property('data');
                        respon.body.success.should.equal(true);
                        respon.body.message.should.equal('data have been updated');
                        respon.body.data.title.should.equal('Trans Studio Mall');
                        respon.body.data.lat.should.equal(-6.9261257);
                        respon.body.data.lng.should.equal(107.6343728)
                        done();
                    })
            })
    });

    it("seharusnya menambahkan satu data dengan metode POST", (done) => {
        chai.request(server)
            .post('/api/maps/add/')
            .send({
                title: "Cihampelas Walk",
                lat: -7.9361368,
                lng: 108.7454839
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.success.should.equal(true);
                res.body.message.should.equal('data have been added');
                res.body.data.title.should.equal("Cihampelas Walk");
                res.body.data.lat.should.equal(-7.9361368);
                res.body.data.lng.should.equal(108.7454839);
                done();
            })
    });

    it("seharusnya menghapus satu data dengan metode DELETE", (done) => {
        chai.request(server)
            .get('/api/maps')
            .end((err, res) => {
                chai.request(server)
                    .delete("/api/maps/" + res.body[0]._id)
                    .send({
                        title: 'Trans Studio Mall',
                        lat: -6.9261257,
                        lng: 107.6343728
                    })
                    .end((err, respon) => {
                        respon.should.have.status(201);
                        respon.should.be.json;
                        respon.body.should.be.a('object');
                        respon.body.should.have.property('success');
                        respon.body.should.have.property('message');
                        respon.body.should.have.property('data');
                        respon.body.success.should.equal(true);
                        respon.body.message.should.equal('data have been deleted');
                        respon.body.data.title.should.equal('Trans Studio Mall');
                        respon.body.data.lat.should.equal(-6.9261257);
                        respon.body.data.lng.should.equal(107.6343728);
                        done();
                    })
            })
    });

    it("seharusnya menampilkan satu data dengan id dan dengan metode GET", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                chai.request(server)
                    .get('/api/maps/' + res.body[0]._id)
                    .send({
                        title: 'Trans Studio Mall',
                        lat: -6.9261257,
                        lng: 107.6343728
                    })
                    .end((err, respon)=>{
                        respon.should.have.status(201);
                        respon.should.be.json;
                        respon.body.should.be.a('object');
                        respon.body.should.have.property('success');
                        respon.body.should.have.property('message');
                        respon.body.should.have.property('data');
                        respon.body.success.should.equal(true);
                        respon.body.message.should.equal('data found');
                        respon.body.data.title.should.equal('Trans Studio Mall');
                        respon.body.data.lat.should.equal(-6.9261257);
                        respon.body.data.lng.should.equal(107.6343728);
                        done();
                    });
            })
    });

});