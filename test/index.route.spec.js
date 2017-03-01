import request from 'supertest';
import server from '../index';
import app from '../server';
import {expect} from 'chai';
import config from '../config';
import sinon from 'sinon';
import Poll from '../models/Poll';
import User from '../models/User';
import mongoose from 'mongoose';

describe('Routes', () => {
  let sandbox;
  let agent = request.agent(server);
  
  beforeEach(()=> {
    sandbox = sinon.sandbox.create();
  })
  
  afterEach(()=> {
    sandbox.restore();
  })
  
  before((done) => {
    let user;
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

  after((done) => {
    User.remove({
    })
      .or([
      {'local.username': 'Abdelmageed'},
      {'local.username': 'NewUser'}])
      .exec ((err) => {
      if (err) throw err;
      console.log('test users removed');
      delete mongoose.models.User;
      delete mongoose.modelSchemas.User;
      server.close();
      done();
    });//more change
  });
  
  describe('POST /login', () => {

    it('should respond with 200 and user object on providing valid credentials', (done) => {
      const user = {
        _id: 1,
        username: 'name'
      };
//      const stubUser = sandbox.stub(User, 'findOne');
//      stubUser.yields(null, user);
      const successMessage = "logged in successfuly";
      agent
        .post('/login')
        .send('username=Abdelmageed&password=password123')
        .expect(200)
        .expect((res)=> {
//          console.log(res.body);  
          expect(res.body.user.username).to.equal('Abdelmageed');
      })
        .end(done);
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
      const successMessage = "your account has been created";
      agent
        .post('/signup')
        .send('username=NewUser&password=NewPassword123')
        .expect(200, successMessage, done);
    });
    
    it('should not sign up a user with a used username', (done)=> {

      agent
        .post('/signup')
        .send('username=NewUser&password=NewPassword123')
        .expect(401, done);
    });
  });
  
  describe('GET /logout', ()=> {
    it('should log out and remove req.user', (done)=> {
      agent
        .get('/logout')
        .expect(200)
        .end((err)=> {
        expect(err).to.equal(null);
        done();
      })
    })
  });
  
  
})
