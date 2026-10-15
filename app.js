const bookingForm = document.getElementById("booking-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const checkInInput = document.getElementById("checkin");
const checkOutInput = document.getElementById("checkout");
const roomTypeInput = document.getElementById("roomtype");
const receiptCard = document.getElementById("receipt-card");
const receiptName = document.getElementById("receipt-name");
const receiptCheckIn = document.getElementById("receipt-checkin");
const receiptCheckOut = document.getElementById("receipt-checkout");
const receiptRoomType = document.getElementById("receipt-roomtype");
const receiptTotalPrice = document.getElementById("receipt-totalprice");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkInStr = checkInInput.value;
  const checkOutStr = checkOutInput.value;

  const checkInDate = new Date(checkInStr);
  const checkOutDate = new Date(checkOutStr);

  if (checkOutDate <= checkInDate) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const numberOfNights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

  if (numberOfNights > 30) {
    alert("You cannot book for more than 30 nights.");
    return;
  }

  const roomPrices = {
    standard: 150,
    deluxe: 250,
    suite: 300,
  };

  const pricePerNight = roomPrices[roomTypeInput.value] || 0;

  if (pricePerNight === 0) {
    alert("Please select a valid room type.");
    return;
  }

  const totalPrice = numberOfNights * pricePerNight;

  const formattedCheckIn = checkInDate.toLocaleDateString("de-DE");
  const formattedCheckOut = checkOutDate.toLocaleDateString("de-DE");

  receiptName.textContent = nameInput.value;
  receiptCheckIn.textContent = formattedCheckIn;
  receiptCheckOut.textContent = formattedCheckOut;
  receiptRoomType.textContent =
    roomTypeInput.options[roomTypeInput.selectedIndex].text;
  receiptTotalPrice.textContent = `$${totalPrice}`;

  receiptCard.classList.remove("hidden");

  const bookingData = {
    name: nameInput.value,
    email: emailInput.value,
    checkIn: checkInInput.value,
    checkOut: checkOutInput.value,
    roomType: roomTypeInput.value,
    totalPrice: totalPrice,
    numberOfNights: numberOfNights,
  };

  console.log("Booking Data:", bookingData);

  const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

  storedBookings.push(bookingData);

  localStorage.setItem("bookings", JSON.stringify(storedBookings));

  bookingForm.reset();
});
