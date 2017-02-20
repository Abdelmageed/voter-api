import request from 'supertest';
import {app} from '../index';
import {expect} from 'chai';
import config from '../config';
import mongoose from 'mongoose';
import User from '../models/User';

describe('Routes', () => {
let agent = request('http://localhost:3000');
  before((done) => {
    let user;
    mongoose.connect(config.DATA_URL, (err) => {
      if (err) throw err;
      console.log('mongoose connected to test db');
      user = new User({
        local: {
          username: "Abdelmageed",
          password: "password123"
        }
      });

      user.save();
      console.log('user Abdelmageed created');
      done();
    });

  });

  after((done) => {
    User.remove({
    })
      .or([
      {'local.username': 'Abdelmageed'},
      {'local.username': 'NewUser'}])
      .exec ((err) => {
      if (err) throw err;
      delete mongoose.models.User;
      delete mongoose.modelSchemas.User;
      console.log('test users removed');
      mongoose.disconnect(() => {
        console.log('mongoose disconnected from test db');
        done();
      });
    });

  });
  
  describe('POST /login', () => {

    it('should respond with 200 and success message with valid credentials', (done) => {
      const successMessage = "logged in successfuly";
      agent
        .post('/login')
        .send('username=Abdelmageed&password=password123')
        .expect(200, successMessage, done);
    });
    it('should respond with 401 on invalid credentials', (done) => {
      const unauthorized = "Unauthorized"
      agent
        .post('/login')
        .send('username=Abdelmageed&password=password1234')
        .expect(401, unauthorized);

      agent
        .post('/login')
        .send('username=Abdelmageedz&password=password1234')
        .expect(401, unauthorized, done);

    });
  });

  describe('POST /signup', () => {
    it('should sign up a user locally by username and password', function (done) {
      this.timeout(5000);
      const successMessage = "your account has been created";
      agent
        .post('/signup')
        .send('username=NewUser&password=NewPassword123')
        .expect(200, successMessage);

      User.remove({
        'local.username': "NewUser"
      }, (err) => {
        expect(err).to.equal(null);
        done();
      });
    });
  })
  
})