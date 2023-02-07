const datepickerPage = document.querySelector(".date-picker");
const datepickerTitle = document.getElementById("title");
const datepickerDate = document.getElementById("date");
const datepickerForm = document.getElementById("form");
const submitButton = document.querySelector(".submit-button");
const countdownPage = document.querySelector(".countdown-page");
const completePage = document.querySelector(".complete-page");
const spanElements = document.querySelectorAll("span");
const countdownTitle = document.querySelector(".countdown-title");
const resetButton = document.querySelector(".reset-button");
const completeMessage = document.querySelector(".complete-message");
const newcountdownButton = document.querySelector(".new-countdown-button");

let countdownInterval = "";
let countdownRange = 0;

// min date for DatePickerInput
let date = new Date();
let todayUnixEpoc = date.getTime();

// console.log(date);
const today = date.toISOString().split("T")[0];
datepickerDate.setAttribute("min", today);

//countdown function
function countdown() {
  const title = datepickerTitle.value;
  if (title) {
    countdownTitle.textContent = title;
  } else {
    countdownTitle.textContent = "No Title";
  }
  let selectedDate = new Date(datepickerDate.value);
  let selectedDateUnixEpoc = new Date().setTime(selectedDate.getTime());
  countdownInterval = setInterval(function () {
    countdownRange = selectedDateUnixEpoc - new Date().getTime();
    let countdownSeconds = countdownRange / 1000;
    let countdownMinutes = countdownSeconds / 60;
    let countdownHours = countdownMinutes / 60;
    let countdownDays = countdownHours / 24;
    spanElements[0].textContent = Math.floor(countdownDays);
    spanElements[1].textContent = Math.floor(countdownHours % 24);
    spanElements[2].textContent = Math.floor(countdownMinutes % 60);
    spanElements[3].textContent = Math.floor(countdownSeconds % 60);
    if (countdownRange < 0) {
      clearInterval(countdownInterval);
      countdownPage.style.display = "none";
      completePage.style.display = "block";
      completeMessage.textContent = `${title} countdown has been Completed!`;
    }
  }, 1000);
}

datepickerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (datepickerDate.value === "") {
    alert("Please select a Date!");
  } else {
    countdown();
    datepickerPage.style.display = "none";
    countdownPage.style.display = "block";
  }
});
resetButton.addEventListener("click", function () {
  clearInterval(countdownInterval);
  datepickerPage.style.display = "flex";
  countdownPage.style.display = "none";
});
newcountdownButton.addEventListener("click", function () {
  datepickerPage.style.display = "flex";
  completePage.style.display = "none";
});
