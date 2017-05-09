import mongoose from 'mongoose';

import config from './config';
import app from './server';

const dev = (process.env.NODE_ENV !== 'production');
let server;
var isPortTaken = function(port, fn) {
  var net = require('net')
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err)
    fn(null, true)
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false) })
    .close()
  })
  .listen(port)
}

const PORT = process.env.PORT || 3000;
function startServer(err, isPortTaken){
  if(! (err && isPortTaken)){
      server = app.listen(PORT, ()=> {
      console.log(`express server started at localhost:${PORT}`);
    });
  }
}


if(dev) {
  isPortTaken(PORT, startServer);
} else {
  server = app.listen(PORT, ()=> {
      console.log(`express server started at localhost:${PORT}`);
  });
}

if(!mongoose.connection.db)
  mongoose.connect(config.DATA_URL);
console.log(`connected to db at ${config.DATA_URL}`);

export default server;