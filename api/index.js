/**
 * Created by brugnara on 09/06/16,
 * @ daniele@brugnara.me
 */

var Router = require('koa-router');
var koaBody = require('koa-body')();
// var koaJson = require('koa-json')();

var debug = require('debug')('url-shrtnr:router');

module.exports = function(options) {

  options = options || {};

  debug('starting routes generator');

  var router = new Router();

  // router.post(path, route.fn);
  router.use('/url', koaBody, require('routes/url')(options).routes());

  debug('returning routes');

  return router;

};