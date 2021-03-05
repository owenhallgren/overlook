import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import userData from './user-test-data.js';
import roomData from './room-test-data.js';
import bookedRoomData from './bookedRoom-test-data.js';

describe('User', function() {
  let user
  beforeEach(() => {
    user = new User(userData[0], bookedRoomData, roomData)
  })

  it('should be a function', function() {
    expect(User).to.be.a('function')
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User)
  })
});
