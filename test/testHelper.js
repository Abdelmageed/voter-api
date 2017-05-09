//import request from 'supertest';
//import app from '../server';
process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import config from '../config';

require('./mongooseSetup');

import app from '../server';
var request = require('supertest');

//express server run on test port
var server = app.listen(config.TEST_PORT, ()=> {
  console.log(`supertest server started at ${config.TEST_PORT}`)
});

//supertest agent
global.agent = request.agent(server);