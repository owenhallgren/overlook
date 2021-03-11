import chai from 'chai';
const expect = chai.expect;
import User from '../src/User';
import RoomRepo from '../src/RoomRepo';
import userData from './user-test-data.js';
import roomData from './room-test-data.js';
import bookedRoomData from './bookedRoom-test-data.js';


describe('RoomRepo', function() {
  let roomRepo
  let roomRepo2
  beforeEach(() => {
    roomRepo = new RoomRepo(roomData, bookedRoomData)
    roomRepo2 = new RoomRepo([], [])
  })

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function')
  });

  it('should be an instance of User', function() {
    expect(roomRepo).to.be.an.instanceof(RoomRepo)
  });

  it('should be properly constructed', function() {
    expect(roomRepo.rooms).to.deep.equal(roomData);
    expect(roomRepo.bookedRooms).to.deep.equal(bookedRoomData);
  });

  it('should return an empty array if no rooms are passed in', function() {
    expect(roomRepo2.filterRoomsByDate("2020/01/08")).to.deep.equal([])
    expect(roomRepo2.filterRoomsByType("2020/01/08", "single room")).to.deep.equal([])

  })

  it("should return empty array if no rooms are avaible based on parameters", function() {
    expect(roomRepo.filterRoomsByType("2020/02/19", "suit")).to.deep.equal([])
  })

  it('should return filtered rooms by data', function() {
    expect(roomRepo.filterRoomsByDate("2020/01/08")).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 6,
        roomType: 'junior suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26
      },
      {
        number: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39
      },
      {
        number: 10,
        roomType: 'suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 497.64
      },
      {
        number: 11,
        roomType: 'single room',
        bidet: true,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 207.24
      },
      {
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09
      },
      {
        number: 13,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92
      },
      {
        number: 14,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88
      },
      {
        number: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56
      },
      {
        number: 16,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 325.6
      },
      {
        number: 17,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 328.15
      },
      {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41
      },
      {
        number: 19,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 374.67
      },
      {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95
      },
      {
        number: 21,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 429.32
      },
      {
        number: 22,
        roomType: 'single room',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 350.31
      },
      {
        number: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36
      },
      {
        number: 24,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 327.24
      }
    ]);

  });

  it('should be able to filter by date and type', function() {
    expect(roomRepo.filterRoomsByDate("2020/01/08", "single room")).to.deep.equal([
  {
    number: 1,
    roomType: 'residential suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 358.4
  },
  {
    number: 2,
    roomType: 'suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 477.38
  },
  {
    number: 3,
    roomType: 'single room',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 491.14
  },
  {
    number: 4,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44
  },
  {
    number: 6,
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02
  },
  {
    number: 7,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 231.46
  },
  {
    number: 8,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 261.26
  },
  {
    number: 9,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 200.39
  },
  {
    number: 10,
    roomType: 'suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 497.64
  },
  {
    number: 11,
    roomType: 'single room',
    bidet: true,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 207.24
  },
  {
    number: 12,
    roomType: 'single room',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 13,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 423.92
  },
  {
    number: 14,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 457.88
  },
  {
    number: 15,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 1,
    costPerNight: 294.56
  },
  {
    number: 16,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 325.6
  },
  {
    number: 17,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 328.15
  },
  {
    number: 18,
    roomType: 'junior suite',
    bidet: false,
    bedSize: 'king',
    numBeds: 2,
    costPerNight: 496.41
  },
  {
    number: 19,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 374.67
  },
  {
    number: 20,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 343.95
  },
  {
    number: 21,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 429.32
  },
  {
    number: 22,
    roomType: 'single room',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 350.31
  },
  {
    number: 23,
    roomType: 'residential suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 176.36
  },
  {
    number: 24,
    roomType: 'suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 327.24
  }])
});

  });
