import mongoose from 'mongoose';
import sinon from 'sinon';
import 'sinon-mongoose';
import {expect} from 'chai';
import User from '../models/User';
import bcrypt from 'bcrypt-nodejs';

describe('User', ()=> {
  
  let user;
  before(()=>{
    mongoose.connect('mongodb://localhost/test', (err)=> {
      if (err) throw err;
      console.log('mongoose connected to test db');
       user = new User({
      username: "Abdelmageed",
      password: "password123"
    });
    
    user.save();
    });
   
  });
  
  after(()=> {
    //doesn't get removed
    User.remove({username: "Abdelmageed"}, (err)=> {
      if (err) throw err;
      delete mongoose.models.User;
      delete mongoose.modelSchemas.User;
      console.log('user Abdelmageed removed');
      mongoose.disconnect(()=> {
      console.log('mongoose disconnected from test db')
    })
    });
    
    
  });
  
  it('should hash the password', function(done) {
    this.timeout(5000);
    const password = "password123",
          hash = bcrypt.hashSync(password);
    
    
    User.findOne({username: "Abdelmageed"}, (err, user)=> {
      expect(err).to.equal(null);
      console.log(user.password);
      expect(bcrypt.compareSync(password, user.password)).to.equal(true);
      done();
    });
    
  });
});
