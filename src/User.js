class User {
  constructor(customerObj, bookedRooms, rooms) {
    this.id = customerObj.id;
    this.name = customerObj.name;
    this.roomsBooked = [];
    this.findBookedRooms(bookedRooms, rooms)
  }

  findBookedRooms (bookedRooms, rooms) {
    let filteredRooms = bookedRooms.filter(room => room.userID === this.id)
    let userBookedRooms = filteredRooms.map(bookedRoom => rooms.find(room => room.number === bookedRoom.roomNumber))
    this.roomsBooked = userBookedRooms
  }

  calculateTotalPrice() {
    let totalPrice = this.roomsBooked.reduce((totalPrice, room) => {
      return totalPrice + room.costPerNight
    },0)

    return Math.round(totalPrice * 100.0) / 100.0;
  }

  bookRoom(room) {
    this.roomsBooked.push(room)
  }
}

export default User;
