const bookingForm = document.getElementById("booking-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const checkInInput = document.getElementById("checkin");
const checkOutInput = document.getElementById("checkout");
const roomTypeInput = document.getElementById("roomtype");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingData = {
    name: nameInput.value,
    email: emailInput.value,
    checkIn: checkInInput.value,
    checkOut: checkOutInput.value,
    roomType: roomTypeInput.value,
  };
  console.log(bookingData);
});
