/**
 * Created by brugnara on 10/06/16,
 * @ daniele@brugnara.me
 */

var koa = require('koa');

var debug = require('debug')('url-shrtnr:slave');
var app = koa();

app.use(function*() {
  this.body = `

<body onclick="alert(1)">

<img src="http://localhost:3000/u/ewfog">

</body>
`;
});

app.listen(3001, '0.0.0.0', function() {
  debug('listening on :3001');
});