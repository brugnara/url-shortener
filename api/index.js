/**
 * Created by brugnara on 09/06/16,
 * @ daniele@brugnara.me
 */

var Router = require('koa-router');
var collectionIndexer = require('collection-indexer');

var debug = require('debug')('url-shrtnr:router');

module.exports = function(options) {

  options = options || {};

  if (!options.collections ||
    !options.collections.url || !options.collections.stats) {

    throw new Error('Missing collections url and stats!');

  }

  if (options.indexDB) {

    debug('indexing db');
    collectionIndexer(options.collections);

  } else {

    debug('not indexing db. If you want to do, just pass indexDB = true');

  }

  if (!options.homepage) {
    debug('warning, missing homepage.');
  }

  debug('starting routes generator');

  var router = new Router();

  return require('routes/url')(options);

};