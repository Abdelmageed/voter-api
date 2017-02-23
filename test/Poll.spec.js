import {expect} from 'chai';
import sinon from 'sinon';
import config from '../config';
import Poll from '../models/Poll';
import User from '../models/User';
import mongoose from 'mongoose';

const addUser = ()=> {
  const user = new User({
    local: {
      username: 'tester',
      password: 'password123'
    }
  });
  user.save((err, newUser)=> {
    if (err) throw err;
  })
}
const removeUser = ()=> {
  User.remove({'local.username': 'tester'}, (err)=> {
    console.log('user "tester" removed');
  });
}
describe('Poll', ()=> {
  
  before((done)=> {
      addUser();
      
      done();
  });
  
  after((done)=> {
    Poll.remove();
    removeUser();
    delete mongoose.models.User;
    delete mongoose.modelSchemas.User;
    delete mongoose.models.Poll;
    delete mongoose.modelSchemas.Poll;
    done();
    });
  
  it('.create(newPoll) should add a new poll', (done) => {
  let newPoll,
    cb = (err, res) => res,
    spy = sinon.spy(cb);
  newPoll = {
    name: 'new poll',
    options: [{
        name: 'option1',
        votes: 0
      },
      {
        name: 'option2',
        votes: 0
      }],
    _author: 'user._id'
  }
  const poll = new Poll({
    name: 'some name'
  });
  const pollMock = sinon.mock(poll);
  pollMock.expects('create')
    .yields(null, newPoll);
  poll.create(newPoll, spy);
  pollMock.verify();
  expect(spy.getCall(0).args[1]).to.equal(newPoll);
  expect(spy.getCall(0).args[0]).to.equal(null);
  done();
});
  
  it('.update(id, newPoll, cb) should update poll with id to newPoll', (done) => {
    const id = 1,
      newPoll = {
        name: 'new name'
      },
      cb = (err, newPoll) => {};
    let spy = sinon.spy(cb);
    const poll = new Poll({
      name: 'name'
    });
    const pollMock = sinon.mock(poll);
    pollMock.expects('update')
      .yields(null, newPoll);
    poll.update(id, newPoll, spy);
    pollMock.verify();
    expect(spy.args[0][0]).to.be.null;
    expect(spy.args[0][1]).to.be.equal(newPoll);
    done();
  });
  
  });
  
  
