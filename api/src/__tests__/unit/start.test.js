const app = require("../index.js");
const request = require('supertest');
const { response } = require("../index.js");

it('tests if connection to endpoint is successful', async() => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
});

it('tests if connection to endpoint is successful', async() => {
    const response = await request(app).get('/measurement');
    expect(response.statusCode).toEqual(200);
});

it('tests if connection to endpoint is successful', async() => {
  const response = await request(app).get('/Sensors');
  expect(response.statusCode).toEqual(200);
});

describe('POST /api/sensors', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/api/sensors')
        .send({naam: 'sensor 1'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });


describe('POST /measurement', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/measurement')
        .send({sensorID: "32", measuredValue: 3.2})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });


describe('PUT: update sensor', function() {
    it('responds with json', function(done) {
        request(app)
          .put('/api/sensors/1')
          .send({naam: "Sensor buiten"})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
});

describe('PUT: update Measuurments', function() {
    it('responds with json', function(done) {
        request(app)
          .put('/Measuurments/32')
          .send({measuredValue: 9.3})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
});

describe('DELETE: delete Sensor op naam', function() {
    it('responds with json', function(done) {
        request(app)
          .delete('/api/sensors/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
});

