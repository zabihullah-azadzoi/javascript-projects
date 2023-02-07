const inputButtons = document.querySelectorAll(".input");
const textarea = document.querySelector(".textarea");
const buttonsArray = Array.from(inputButtons);

//variables
let firstNumber = 0;
let secondNumber = 0;
let operator = "";

const numbers = buttonsArray.forEach(function (button) {
  if (button.classList.contains("number")) {
    button.addEventListener("click", function () {
      const previousNum = textarea.textContent;
      const newNum = button.textContent;
      displayValues(previousNum, newNum);
    });
  } else if (button.classList.contains("operation")) {
    button.addEventListener("click", () => (operator = button.textContent));
  } else if (button.classList.contains("dot")) {
    button.addEventListener("click", function () {
      if (!textarea.textContent.includes(".") || secondNumber !== 0) {
        textarea.textContent = textarea.textContent + button.textContent;
      } else {
      }
    });
  } else if (button.classList.contains("equal")) {
    button.addEventListener("click", calculate);
  } else if (button.classList.contains("reset")) {
    button.addEventListener("click", reset);
  }
});

//reset everything
function reset() {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  textarea.textContent = "0";
}
//calculate values
function calculate() {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  textarea.textContent = "0";
  if (operator === "+") {
    firstNumber = firstNumber + secondNumber;
    secondNumber = 0;
    textarea.textContent = firstNumber;
  } else if (operator === "-") {
    firstNumber = firstNumber - secondNumber;
    secondNumber = 0;
    textarea.textContent = firstNumber;
  } else if (operator === "×") {
    firstNumber = firstNumber * secondNumber;
    secondNumber = 0;
    textarea.textContent = firstNumber;
  } else if (operator === "÷") {
    if (secondNumber === 0) {
      textarea.textContent = "Infinity";
    } else {
      firstNumber = firstNumber / secondNumber;
      secondNumber = 0;
      textarea.textContent = firstNumber;
    }
  }
}
//display values
function displayValues(previousNum, newNum) {
  if (previousNum !== "0") {
    textarea.textContent = previousNum + newNum;
    if (operator !== "" && secondNumber === 0) {
      textarea.textContent = newNum;
    } else {
      textarea.textContent = previousNum + newNum;
    }
  } else {
    textarea.textContent = newNum;
  }
  if (operator === "") {
    firstNumber = textarea.textContent;
  } else if (operator !== "") {
    secondNumber = textarea.textContent;
    textarea.textContent = secondNumber;
  }
}
