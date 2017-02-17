import sinon from 'sinon';
import 'sinon-mongoose';
import {expect} from 'chai';
import User from '../models/User';
import bcrypt from 'bcrypt-nodejs';

describe('User', ()=> {
  
  let user;
  before(()=>{
    user = new User({
      username: "Abdelmageed",
      password: "password123"
    });
    
    user.save()
  });
  
  it('should create a new user with a username and password', (done)=> {
    user = new User({
      username: "Abdelmageed",
      password: "123"
    });
    
    const userMock = sinon.mock(user);
    userMock
      .expects('save')
      .yields(null);
    
    user.save((err)=> {
      userMock.verify();
      expect(err).to.equal(null);
      done();
    });
    
  })
  
  it('should hash the password', ()=> {
    const password = "password123",
          hash = bcrypt.hashSync(password);
    
    const user = new User({
      username: "Abdelmageed",
      password
    }),
          userMock = sinon.mock(user)
            .expects('save')
            .yields(null, {
              username:"Abdelmageed",
              password
            });
    
    user.save((err, newUser)=> {
      userMock.verify();
      expect(newUser.password).to.equal(hash);
    });
    
  });
});
