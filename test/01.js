/**
 * Created by brugnara on 12/06/16,
 * @ daniele@brugnara.me
 */

require('co-mocha');

var http = require('http');
var should = require('should');
var co = require('co');
var request = require('supertest');
var mongo = require('mongodb').MongoClient;

var debug = require('debug')('test');

var routesGenerator = require('../');

describe('# setter-getter', function() {

  var collections = {};

  beforeEach(function*() {

    var db = yield mongo.connect('mongodb://localhost/test');

    collections.url = db.collection('url');
    collections.stats = db.collection('statistics');

    try {
      yield collections.url.drop();
      yield collections.stats.drop();
    } catch(e) {
      debug(e.message);
    }

  });

  describe('# errors', function() {

    it('should throw error with missing params', function () {

      var err;

      try {
        var shortenerRoutes = routesGenerator();
      } catch (e) {
        err = e;
      }

      (!!err).should.be.true();
      err.should.have.property('message', 'Missing collections url and stats!');

    });

    it('should throw error with one missing param', function () {

      var err;

      try {
        var shortenerRoutes = routesGenerator({
          collections: {
            url: collections.url
          }
        });
      } catch (e) {
        err = e;
      }

      (!!err).should.be.true();
      err.should.have.property('message', 'Missing collections url and stats!');

    });

    it('should throw error with one missing param', function () {

      var err;

      try {
        var shortenerRoutes = routesGenerator({
          collections: {
            stats: collections.stats
          }
        });

      } catch (e) {
        err = e;
      }

      (!!err).should.be.true();
      err.should.have.property('message', 'Missing collections url and stats!');

    });

    it('should not throw any error with no missing params', function () {

      var err;
      var shortenerRoutes;

      try {
        shortenerRoutes = routesGenerator({
          collections: collections
        });
      } catch (e) {
        err = e;
      }

      (!!err).should.be.false();

    });

  });

  // todo: finish

  describe.skip('# indexing', function() {

    it('should index the db', function(done) {

      var err;
      var shortenerRoutes;

      this.timeOut = 10 * 1000;

      try {
        shortenerRoutes = routesGenerator({
          indexDB: true,
          collections: collections
        });
      } catch (e) {
        err = e;
      }

      (!!err).should.be.false();

      setTimeout(co.wrap(function*() {
        try {
          // check indici
          var indexes = yield collections.url.indexes();
          debug(indexes);
          done()
        } catch(e) {
          debug(e);
          return done(e);
        }
      }), 500);

    });

  });

  // todo: check url working as expected

  describe.skip('# set', function() {

    it('should throw error with missing params', function() {

      var app = koa();

      request(http.createServer(app.callback()))
        .get('/parent-route/first-nested-route')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('n', 1);
          done();
        });

    })

  });

});