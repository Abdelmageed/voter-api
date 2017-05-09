import {expect} from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
const User = mongoose.model('User');
import {seed, reset} from './seedData';

describe('Routes', () => {
  let sandbox;
  
  beforeEach(()=> {
    sandbox = sinon.sandbox.create();
  })
  
  afterEach(()=> {
    sandbox.restore();
  })
  
 before((done) => {
    seed(done);
  });

  after((done) => {
    reset(done);
  });
  
  describe('POST /login', () => {

    it('should respond with 200 and user object on providing valid credentials', (done) => {
      const user = {
        _id: 1,
        username: 'name'
      };

      const successMessage = "logged in successfuly";
      agent
        .post('/login')
        .send('username=Abdelmageed&password=password123')
        .expect(200)
        .expect((res)=> {

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
      agent
        .post('/signup')
        .send('username=NewUser&password=NewPassword123')
        .expect(200)
        .expect((res)=> {
          expect(res.body.user.username).to.equal('NewUser');
        })
        .end(done);
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
  
  describe('POST /check_username', ()=> {
    
    it('should respond with {valid:false} if the username is unavailable', (done)=> {
      const stubUser = sandbox.stub(User, 'findOne');
      stubUser.yields(null, {user: 'user'});
      
      agent
        .post('/check_username')
        .send({username: 'name'})
        .expect(200, {valid: false}, done);
      
    });
    
    it('should respond with {valid:true} if the username is available', (done)=> {
      const stubUser = sandbox.stub(User, 'findOne');
      stubUser.yields(null, null);
      
      agent
        .post('/check_username')
        .send({username: 'name'})
        .expect(200, {valid: true}, done);
    });
  });
})
