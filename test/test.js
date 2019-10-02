//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe('Events', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET events', () => {
        it('it should GET all the events', (done) => {
            chai.request('http://localhost:1995/api')
                .get('/events')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST events', () => {
        it('it should POST a event', (done) => {
            let event = {
                name: 'GDG mien trung',
                startDate: '10-10-2019',
                dueDate: 10,
                description: 'Mien trung.....',
            };
            chai.request(server)
                .post('/events')
                .send(event)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
        it('it should not POST a book without status field', (done) => {
            let event = {
                name: 'DBG'
            };
            chai.request(server)
                .post('/events')
                .send(event)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Missing required params');
                    done();
                });
        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id events', () => {
        it('it should UPDATE a event given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            let id = '132132131231312';
            chai.request(server)
                .put('/events/' + id)
                .send({
                    name: 'GDG mien trung',
                    startDate: '10-10-2019',
                    dueDate: 10,
                    description: 'Mien trung.....',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Not valid object id value');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id events', () => {
        it('it should DELETE a event given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            let id = '5d94b405c7d5628d6553d1a8';
            chai.request(server)
                .delete('/events/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                });
        });
    });
});