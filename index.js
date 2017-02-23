import config from './config';
import app from './server';

const server = app.listen(config.PORT, 'localhost');

//, function() {
//  console.log(`express server listening at ${this.address().ip} on port ${this.address().port}`);
//}
export default server;