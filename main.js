var static = require('node-static');
var http = require('http');

var file = new(static.Server)(__dirname);

const PORT=8080;
const DEBUG=false;

http.createServer(function (req, res) {
  if(DEBUG) console.log(`${Date().toString()} Request : ${req.url}`);
  file.serve(req, res,(e,res) => {
    if(DEBUG && e && (e.status === 404)){
      console.error(`Not found : ${req.url}`);
    }
  });
}).listen(PORT);
console.log(`Listening on port ${PORT}`);