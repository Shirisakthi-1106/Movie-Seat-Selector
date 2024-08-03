const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat-sold)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

function resetSeats() {
  seats.forEach(seat => {
      seat.classList.remove('seat-selected');
  });
  updateSelectedCountAndTotal();
}

// Function to update the count and total price
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.seat-selected');
  const selectedSeatsCount = selectedSeats.length;

  const ticketPrice = parseInt(movieSelect.value.split('Rs.')[1], 10);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Set default or saved movie selection
const savedMovieIndex = localStorage.getItem('selectedMovieIndex');
movieSelect.selectedIndex = savedMovieIndex !== null ? savedMovieIndex : 0;

// Reset seats and update display
resetSeats();

// Remove local storage items related to the selected movie
localStorage.removeItem('selectedMovieIndex');
localStorage.removeItem('selectedMoviePrice');

// Event listener for seat click
seats.forEach(seat => {
  seat.addEventListener('click', () => {
      if (seat.classList.contains('seat-sold')) {
          return; // Seat is sold
      }
      seat.classList.toggle('seat-selected');
      updateSelectedCountAndTotal();
  });
});

// Event listener for movie selection change
movieSelect.addEventListener('change', () => {
  updateSelectedCountAndTotal();
});




let ticketPrice = +movieSelect.value;

// Populate UI with selected seats and movie data
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +movieSelect.value;
    updateSelectedCount();
  }
}

// Update selected seats count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = (selectedSeatsCount * ticketPrice).toFixed(2);
}

// Save selected seats to local storage
function saveSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Set movie data in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update ticket price based on selected movie
function updateTicketPrice() {
  ticketPrice = +movieSelect.value;
  setMovieData(movieSelect.selectedIndex, ticketPrice);
  updateSelectedCount();
}

// Event listeners
movieSelect.addEventListener('change', updateTicketPrice);

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('seat-sold')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
    saveSelectedSeats();
  }
});

// Initial calls
populateUI();
updateSelectedCount();
