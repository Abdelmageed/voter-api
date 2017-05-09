import mongoose from 'mongoose';
import config from '../config';

if(!mongoose.connection.db) {
  mongoose.connect(config.DATA_URL, ()=> {
    console.log(`connected to DB at ${config.DATA_URL}`);
  });
  require('../models/User');
}