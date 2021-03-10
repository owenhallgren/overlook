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

  it("should return rooms booked", function() {
    expect(user.roomsBooked).to.deep.equal([
  {
    number: 12,
    roomType: 'single room',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 20,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 343.95
  }
    ])
  });

  it('should return the total price of rooms booked', function() {
    expect(user.calculateTotalPrice()).to.equal(516.04);
  })

});
