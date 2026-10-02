const bookingForm = document.getElementById("booking-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const checkInInput = document.getElementById("checkin");
const checkOutInput = document.getElementById("checkout");
const roomTypeInput = document.getElementById("roomtype");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkInStr = checkInInput.value;
  const checkOutStr = checkOutInput.value;

  if (!checkInInput.value || !checkOutInput.value) {
    alert("Please select both check-in and check-out dates.");
    return;
  }
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
  alert(`Total price for your stay is: $${totalPrice}`);

  const formattedCheckIn = checkInDate.toLocaleDateString("de-DE");
  const formattedCheckOut = checkOutDate.toLocaleDateString("de-DE");

  alert(
    `Thank you, ${nameInput.value}!\n\n` +
      `Your booking is confirmed.\n` +
      `Stay: ${formattedCheckIn} to ${formattedCheckOut}\n` +
      `Room Type: ${roomTypeInput.value}\n` +
      `Total Price: ${totalPrice}`,
  );

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
});
