import './css/base.scss';
import User from './User';
let userData = [];
let roomData = [];
let bookedRoomData = [];
let moneySpent = document.querySelector(".money-spent-test");
let bookRoomButton = document.querySelector(".book-room")


function fetchData() {
  fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())
  .then(response => {
    userData.push(...response.customers)
  }).then(fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(response => {
    roomData.push(...response.rooms)
  })).then(fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(response => {
    bookedRoomData.push(...response.bookings)
    initialize(userData, roomData, bookedRoomData)
  }))};

window.addEventListener('load', fetchData)


function initialize (userData, roomData, bookedRoomData) {
  let user = new User(userData[0], bookedRoomData, roomData);
  let moneySpent = document.querySelector(".money-spent-test");
  let bookRoomButton = document.querySelector(".book-room")
  let roomsBookedTable = document.querySelector(".rooms-booked-table")
  let tableBody = document.querySelector(".table-body");
  let openRoomsTableBody = document.querySelector('.open-rooms-body')



displayPrice();
displayBookedRooms();


function displayBookedRooms() {
  user.roomsBooked.forEach(room => {
    tableBody.innerHTML +=
    `
    <tr>
      <td>${room.roomType}</td>
      <td class="right-alligned">${room.numBeds}</td>
      <td>${room.bedSize}</td>
      <td>${room.bidet? 'Yes':''}</td>
      <td class="right-alligned">${room.costPerNight}</td>
    </tr>

    `
  }) }

  findOpenRooms("2020/01/25")

  function findOpenRooms(date) {
    let filteredByDate = bookedRoomData.filter(room => date === room.date )
    let roomsToDisplay = filteredByDate.map(bookedRoom => roomData.find(room => room.number === bookedRoom.roomNumber))

    roomsToDisplay.forEach(room => {
      openRoomsTableBody.innerHTML +=
      `
      <tr>
        <td>${room.roomType}</td>
        <td class="right-alligned">${room.numBeds}</td>
        <td>${room.bedSize}</td>
        <td>${room.bidet? 'Yes':''}</td>
        <td class="right-alligned">${room.costPerNight}</td>
      </tr>

      `
    })
  }



function displayPrice() {
  // console.log(user.roomsBooked)
  moneySpent.innerText = `${user.calculateTotalPrice()}`
}

// test()

}
