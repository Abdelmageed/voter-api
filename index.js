import config from './config';
import server from './server';

server.listen(config.PORT, 'localhost', function() {
  console.log(`express server listening at ${this.address().ip} on port ${this.address().port}`);
});