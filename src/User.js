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
    userBookedRooms.forEach(room => this.roomsBooked += room)
  }

  calculateTotalPrice() {
    return roomsBooked.reduce((totalPrice, room) => totalPrice + room.costPerNight)
  }
}

export default User;
