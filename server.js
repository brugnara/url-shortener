/**
 * Created by brugnara on 09/06/16,
 * @ daniele@brugnara.me
 */

var koa = require('koa');
var Router = require('koa-router');
var mongo = require('mongodb').MongoClient;
var co = require('co');

var debug = require('debug')('url-shrtnr');
var app = koa();
var router = new Router();

co(function*() {

  debug('mongo connecting...');
  var db = yield mongo.connect('mongodb://localhost/shortener');
  debug('mongo connected!');

  var shortenerRouter = require('.')({
    homepage: 'http://brugnara.me',
    collections: {
      url: db.collection('shortener'),
      stats: db.collection('statistics')
    }
  });

  // two alternative uses:

  // # 1
  // app.use(shortenerRouter.routes());

  // # 2
  router.use('/u', shortenerRouter.routes());
  app.use(router.routes());

}).catch(function(e) {
  console.log(e);
  process.exit(1);
});

app.listen(process.env.PORT || 3000, '0.0.0.0', function() {
  debug('app listening on 0.0.0.0:%s', process.env.PORT || 3000);
});