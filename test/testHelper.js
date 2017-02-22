//import request from 'supertest';
//import app from '../server';
import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.DATA_URL);

//let agent = request.agent(app.listen());