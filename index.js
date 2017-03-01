import config from './config';
import app from './server';
import mongoose from 'mongoose';
import User from './models/User';

const server = app.listen(config.PORT, 'localhost');

//, function() {
  console.log(`express server listening on port ${config.PORT}`);
//}

const user = new User({local: {username: 'Abdelmageed', password: 'password123'}});
user.save((err, newUser)=> {
  console.log('user saved');
});
if(!mongoose.connection.db)
  mongoose.connect(config.DATA_URL);

export default server;