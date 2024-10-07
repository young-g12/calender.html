let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the number of days in the month considering leap years
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Change the month, either increment or decrement
function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
}

// Change the year
function changeYear(delta) {
  currentYear += delta;
  updateCalendar();
}

// Add an event to a specific date cell
function addEvent(input, event) {
  if (event.key === "Enter") {
    const eventText = input.value.trim();
    if (eventText) {
      const cell = input.parentElement;

      // Create a new div to hold the event and delete button
      const eventContainer = document.createElement("div");
      eventContainer.classList.add("event");

      // Create a delete button for the event
      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "&times;";
      deleteBtn.onclick = function () {
        cell.removeChild(eventContainer);
      };

      // Add the event text and the delete button
      eventContainer.innerText = eventText;
      eventContainer.appendChild(deleteBtn);

      // Append the eventContainer and clear the input
      cell.appendChild(eventContainer);
      input.value = "";
    }
    event.preventDefault();
  }
}

// Update the calendar based on the current month and year
function updateCalendar() {
  const calendarBody = document.getElementById("calendarBody");
  const monthYearDisplay = document.getElementById("monthYearDisplay");
  const yearDisplay = document.getElementById("yearDisplay");

  // Update month and year display
  monthYearDisplay.innerText = months[currentMonth];
  yearDisplay.innerText = currentYear;

  // Clear previous calendar
  calendarBody.innerHTML = "";

  // Get the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

  let date = 1;
  // Create 6 rows (because some months can span 6 weeks)
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    // Create 7 cells for each day of the week
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      // Add days of the month
      if (i === 0 && j < firstDay) {
        // Empty cells before the first day of the month
        cell.innerHTML = "";
      } else if (date > daysInCurrentMonth) {
        // Empty cells after the last day of the month
        break;
      } else {
        // Add the day number and an input field for events
        const dayNumber = document.createElement("span");
        dayNumber.innerText = date;
        const eventInput = document.createElement("input");
        eventInput.type = "text";
        eventInput.placeholder = "Event";
        eventInput.onkeydown = function (e) {
          addEvent(this, e);
        };

        cell.appendChild(dayNumber);
        cell.appendChild(eventInput);
        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);

    // Stop creating rows if we've already created all the days
    if (date > daysInCurrentMonth) {
      break;
    }
  }
}

// Initialize the calendar
updateCalendar();
