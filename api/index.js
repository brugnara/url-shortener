/**
 * Created by brugnara on 09/06/16,
 * @ daniele@brugnara.me
 */

var Router = require('koa-router');
var koaBody = require('koa-body')();
var collectionIndexer = require('collection-indexer');

var debug = require('debug')('url-shrtnr:router');

module.exports = function(options) {

  options = options || {};

  debug('indexing db');
  collectionIndexer(options.collections);

  debug('starting routes generator');

  var router = new Router();

  // router.post(path, route.fn);
  router.use('/u', koaBody, require('routes/url')(options).routes());

  debug('returning routes');

  return router;

};