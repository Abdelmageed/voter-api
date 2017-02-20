import request from 'supertest';
import {
  app
}
from '../server';
import config from '../config';
import mongoose from 'mongoose';
import sinon from 'sinon';
import 'sinon-mongoose';
import {
  expect
}
from 'chai';
import User from '../models/User';
import bcrypt from 'bcrypt-nodejs';

let agent = request('http://localhost:3000');

describe('User', () => {

  before(() => {
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
    });

  });

  after(() => {
    User.remove({
      username: "Abdelmageed"
    }, (err) => {
      if (err) throw err;
      delete mongoose.models.User;
      delete mongoose.modelSchemas.User;
      console.log('user Abdelmageed removed');
      mongoose.disconnect(() => {
        console.log('mongoose disconnected from test db')
      })
    });

  });

  it('should hash the password', function (done) {
    this.timeout(5000);
    const password = "password123";

    User.findOne({
      'local.username': "Abdelmageed"
    }, (err, doc) => {
      expect(err).to.equal(null);
      expect(bcrypt.compareSync(password, doc.local.password)).to.equal(true);
      done();
    });

  });

  it('should match the hashed password with its plain text password', (done) => {
    const expected = {
      isMatch: true
    };

    User.findOne({
      'local.username': "Abdelmageed"
    }, (err, doc) => {
      expect(err).to.equal(null);
      expect(doc.validatePassword('password123')).to.deep.equal(expected);
      done();
    });
  });

  it('should return an error if hashed password does not match plain text password', (done) => {
    const expected = {
      error: 'wrong password'
    };
    User.findOne({
      'local.username': "Abdelmageed"
    }, (err, doc) => {
      expect(err).to.equal(null);
      expect(doc.validatePassword('password1234')).to.deep.equal(expected);
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
