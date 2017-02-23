import {expect} from 'chai';
import authenticated from '../middleware/authenticated';
import sinon from 'sinon';

let sandbox;
beforeEach(()=> {
  sandbox = sinon.sandbox.create();
})

afterEach(()=> {
  sandbox.restore();
})

describe('Middleware authenticated', ()=> {
  it('should return next() if authenticated', ()=> {
    const req = {isAuthenticated: ()=> true};
    const res = {};
    const next = ()=> {};
    
    expect(authenticated(req, res, next)).to.equal(next());
  });
  it('should reurn 401 "Unauthorized" if not authenticated', ()=> {
    const req = {isAuthenticated: ()=> false};
    const res = {end: ()=> {}, status: (code)=> {}};
    const next = ()=> {};
    
    const statusSpy = sandbox.spy(res, 'status');
    const endSpy = sandbox.spy(res, 'end');
    
    authenticated(req, res, next);
    expect(statusSpy.called).to.be.true;
    expect(statusSpy.args[0][0]).to.equal(401);
    expect(endSpy.called).to.be.true;
  })
});