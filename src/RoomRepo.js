class RoomRepo {
  constructor(rooms, bookedRooms) {
    this.rooms = rooms
    this.bookedRooms = bookedRooms
  }

  filterRoomsByDate(date) {
    let filteredByDate = this.bookedRooms.filter(room => date === room.date)
    return this.rooms.filter(room => !filteredByDate.find(bookedRoom => bookedRoom.roomNumber === room.number))
  }

  filterRoomsByType(date, type) {
    let filteredByDate = this.bookedRooms.filter(room => date === room.date)
    let roomsToDisplay = this.rooms.filter(room => !filteredByDate.find(bookedRoom => bookedRoom.roomNumber === room.number))
    return roomsToDisplay.filter(room => room.roomType === type)
  }
}

export default  RoomRepo;
