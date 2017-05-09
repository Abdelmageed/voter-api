import mongoose from 'mongoose';
import sinon from 'sinon';
import 'sinon-mongoose';
import {expect}from 'chai';
const User = mongoose.model('User');
import bcrypt from 'bcrypt-nodejs';
import {seed, reset} from './seedData';

describe('User', () => {

  before((done) => {
    seed(done);
  });

  after((done) => {
    reset(done);
  });
  
  it('should hash the password', function (done) {
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

  