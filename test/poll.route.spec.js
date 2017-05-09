import mongoose from 'mongoose';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonMongoose from 'sinon-mongoose';
const Poll = mongoose.model('Poll');
let sandbox;

beforeEach(() => {
  sandbox = sinon.sandbox.create();
})

afterEach(() => {
  sandbox.restore();
})

describe('Poll Router', () => {
  
  describe('GET /poll', () => {
    
    it('should return all the polls', (done) => {
      const polls = [{
        name: 'poll1'
      }, {
        name: 'poll2'
      }];
      const pollStub = sandbox.mock(Poll)
        .expects('find')
        .chain('populate')
        .chain('exec')
        .yields(null, polls);
      agent
        .get('/poll')
        .expect(200, {polls}, done);
    });
    
  });

  describe('PUT /poll', ()=> {
    
    it('should update the poll with id == req.id to poll == req.poll', (done)=> {
      const id = 1,
            newPoll = {name: 'new poll'};
      
      const pollStub = sandbox.stub(Poll, 'findByIdAndUpdate');
      pollStub.yields(null, newPoll);
      agent
        .put('/poll')
        .send({id, newPoll})
        .expect(200, done);
    })
    
  });
  
  describe('GET /poll/:id', ()=> {
    
    it('responds with the poll with the given id', (done)=> {
      const id = 1,
            poll = {name: 'poll name'};
      
      const pollStub = sandbox.mock(Poll)
        .expects('findOne')
        .chain('populate')
        .chain('exec')
        .yields(null, poll);
      agent
        .get('/poll/:id')
        .send({id})
        .expect(200, {poll}, done);
    })
  });
  
  describe('DELETE /poll/:id', ()=> {
    
    it('should remove the poll with the given id', (done)=> {
      const id = 1;
      
      const pollStub = sandbox.stub(Poll, 'remove');
      pollStub.yields(null);
      agent
        .delete('/poll/:id')
        .send({id})
        .expect(200, done);
    })
  });
  
  describe('POST /poll', ()=> {
    
    it('should save the give poll', (done)=> {
      const poll = {name: 'created poll'};
      const pollStub = sandbox.stub(Poll, 'populate');
      pollStub.yields(null, poll);
      agent
        .post('/poll')
        .send(poll)
        .expect(200, poll, done);
    })
  })
});