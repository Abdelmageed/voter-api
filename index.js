import config from './config';
import app from './server';

const server = app.listen(config.PORT, 'localhost');

//, function() {
  console.log(`express server listening on port ${config.PORT}`);
//}
export default server;