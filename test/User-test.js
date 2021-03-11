import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import userData from './user-test-data.js';
import roomData from './room-test-data.js';
import bookedRoomData from './bookedRoom-test-data.js';

describe('User', function() {
  let user
  let user2
  beforeEach(() => {
    user = new User(userData[0], bookedRoomData, roomData)
    user2 = new User(userData[1], [], [])
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

  it('should return an empty array if user has no rooms booked', function() {
    expect(user2.roomsBooked).to.deep.equal([])
  })

  it('should return the total price of rooms booked', function() {
    expect(user.calculateTotalPrice()).to.equal(516.04);
  })

  it('should return 0 if no rooms have been booked', function() {
    expect(user2.calculateTotalPrice()).to.equal(0)
  })

  it('should update rooms booked if a room is booked', function() {
    user.bookRoom(roomData[0])
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
  }, {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4
  }
    ])
  })
  it("should book a room even if the user has no rooms booked", function() {
    user2.bookRoom(roomData[0])
    expect (user2.roomsBooked).to.deep.equal([{
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    }])
  })

});
