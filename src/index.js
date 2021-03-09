import './css/base.scss';
import User from './User';
let userData = [];
let roomData = [];
let bookedRoomData = [];
let moneySpent = document.querySelector(".money-spent");
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
  let moneySpent = document.querySelector(".money-spent");
  // let bookRoomButton = document.querySelector(".book-room")
  let roomsBookedTable = document.querySelector(".rooms-booked-table")
  let tableBody = document.querySelector(".table-body");
  let openRoomsTableBody = document.querySelector('.open-rooms-body')
  // let bookRoomButton = document.querySelector(".book-room-button")
  let dateInput = document.querySelector(".date-input")
  let findRoomButton = document.querySelector(".find-room")
  let successfulSubmit = document.querySelector(".successful-submit")
  let failedSubmit = document.querySelector(".failed-submit")
  let showBookedRoomSection = document.querySelector('.show-book-room-section')
  let bookRoomSection = document.querySelector(".book-room-section")
  let homePage = document.querySelector(".home-page")
  let homeButton = document.querySelector(".go-home-button")
  let roomFilter = document.querySelector(".room-filter")




  findRoomButton.addEventListener('click', findOpenRoomHelper)
  showBookedRoomSection.addEventListener('click', showBookRoomSection)
  homeButton.addEventListener("click", hideBookRoomSection)

  function showBookRoomSection() {
    bookRoomSection.classList.remove('hidden')
    homePage.classList.add("hidden")
    homeButton.classList.remove("hidden")
    showBookedRoomSection.classList.add('hidden')
  }

  function hideBookRoomSection() {
    bookRoomSection.classList.add('hidden')
    homePage.classList.remove("hidden")
    showBookedRoomSection.classList.remove('hidden')
    homeButton.classList.add("hidden")
    successfulSubmit.classList.add("hidden")
    failedSubmit.classList.add("hidden")
  }

  function bookSelectedRoom(e) {
    let roomNumber = parseInt(e.target.getAttribute("data-room"))
    let matchedRoom = roomData.find(room => room.number === roomNumber)
    user.bookRoom(matchedRoom)
    let date = dateInput.value.replaceAll("-", "/")
    postBooking(date, roomNumber)
  }



displayPrice();
displayBookedRooms();

function findOpenRoomHelper() {
  findOpenRooms(dateInput.value.replaceAll("-", "/"))
}


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





  function findOpenRooms(date) {
    if(!roomFilter.value === default) {

      let filteredByDate = bookedRoomData.filter(room => date === room.date )
      let roomsToDisplay = filteredByDate.map(bookedRoom => roomData.find(room => room.number === bookedRoom.roomNumber))
      let roomTypesToDisplay = roomsToDisplay.map(bookedRoom => roomData.find(room => room.roomType === roomFilter.value))

      roomTypesToDisplay.forEach(room => {

        openRoomsTableBody.innerHTML +=
        `
        <tr>
          <td>${room.roomType}</td>
          <td class="right-alligned">${room.numBeds}</td>
          <td>${room.bedSize}</td>
          <td>${room.bidet? 'Yes':''}</td>
          <td class="right-alligned">${room.costPerNight}</td>
          <td><button data-room="${room.number}" class="book-room-button">Book Room</button></td>
        </tr>

        `
      })
      const bookedRoomButtons = document.querySelectorAll('.book-room-button')
      bookedRoomButtons.forEach(function(currentBtn){
        currentBtn.addEventListener('click', bookSelectedRoom)
      })

    }



  }



function displayPrice() {
  moneySpent.innerText = `${user.calculateTotalPrice()}`
}

function postBooking(date, roomNumber) {
  fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"userID": user.id, "date": date, "roomNumber": roomNumber})
  })
  .then(checkForError)
  .catch(err => showErrorMessage());
}

const checkForError = response => {
  if (!response.ok) {
    showErrorMessage();
  } else {
    successfulSubmit.classList.remove("hidden")
    return response.json();
  }
}

function showErrorMessage() {
  failedSubmit.classList.remove("hidden")
}
}
