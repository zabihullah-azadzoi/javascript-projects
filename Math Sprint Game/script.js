//Global pages
const form = document.getElementById("form");
const countdownPage = document.querySelector(".countdown");
const equationsPage = document.querySelector(".equations-page");
const scorePage = document.querySelector(".score-page");

//splash page
const inputs = document.querySelectorAll("input");
const questionsContainer = document.querySelectorAll(".questions-container");
const scoreNumberEls = document.querySelectorAll(".score-number");

//score page
const totalTimeEl = document.querySelector(".total-time");
const baseTimeEl = document.querySelector(".base-time");
const penaltyTimeEl = document.querySelector(".penalty-time");
const startAgainButton = document.querySelector(".start-again-button");

//equation page
const equations = document.querySelector(".equations");
const trueButton = document.querySelector(".button-right");
const wrongButton = document.querySelector(".button-wrong");

//global variables
let inputValue;
let equationsArray = [];
let scrollEquationsEl = 0;
let userCorrectInput = 0;
let userWrongInput = 0;
let playerGuess = [];
let baseTime = 0;
let passTimeInterval = setInterval;
let penaltyTime = 0;
let scoresArray = [
  {
    inputValue: "10",
    highestScore: 0,
  },
  {
    inputValue: "25",
    highestScore: 0,
  },
  {
    inputValue: "50",
    highestScore: 0,
  },
  {
    inputValue: "99",
    highestScore: 0,
  },
];

//get highestScores form localstorage
if (localStorage.getItem("highestScores")) {
  scoresArray = JSON.parse(localStorage.getItem("highestScores"));
}
//functions

//display equations page
function displayEquations() {
  countdownPage.style.display = "none";
  equationsPage.style.display = "block";
  generateEquations();
  passTimeInterval = setInterval(() => {
    baseTime += 0.1;
  }, 100);
}

//scores to DOM
function scoreToDOM() {
  const base = Math.round(parseFloat(baseTime));
  const penalty = parseFloat(penaltyTime);
  const total = base + penalty;
  totalTimeEl.textContent = `${total}s`;
  baseTimeEl.textContent = `Base Time:  ${base}s`;
  penaltyTimeEl.textContent = `Penalty Time: ${penalty}s`;
  storeScores(total);
  setTimeout(() => {
    startAgainButton.style.visibility = "visible";
  }, 1000);
}

// Store highestscores in localStorage
function storeScores(total) {
  scoresArray.findIndex((element) => {
    if (element.inputValue === inputValue) {
      if (total < element.highestScore || element.highestScore === 0) {
        console.log(element.highestScore, total);
        element.highestScore = total;
        console.log("working");
        localStorage.setItem("highestScores", JSON.stringify(scoresArray));
      }
    }
  });
}

//highestScores to DOM
function highestScoresToDOM() {
  scoreNumberEls.forEach((element, index) => {
    element.textContent = `${scoresArray[index].highestScore}s`;
  });
}
highestScoresToDOM();

//generate equations
function generateEquations() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const correctQuestions = inputValue - getRandomInt(inputValue);
  const wrongQuestions = inputValue - correctQuestions;

  //loop for true questions
  for (let i = 0; i < correctQuestions; i++) {
    let firstNum = getRandomInt(9);
    let secondNum = getRandomInt(9);
    let equation = `${firstNum}  x  ${secondNum}  =  ${firstNum * secondNum}`;
    const trueEquation = {
      equation: equation,
      validity: "true",
    };
    equationsArray.push(trueEquation);
  }
  //loop for wrong questions
  for (let i = 0; i < wrongQuestions; i++) {
    let firstNum = getRandomInt(9);
    let secondNum = getRandomInt(9);
    let equation = `${firstNum}  x  ${secondNum}  =  ${
      firstNum * secondNum - getRandomInt(9) - 1
    }`;
    const wrongEquation = {
      equation: equation,
      validity: "false",
    };
    equationsArray.push(wrongEquation);
    equationsArray = shuffle(equationsArray);
  }
  equationsToDOM();
}

//equations to DOM
function equationsToDOM() {
  equationsArray.forEach(function (item) {
    const equationParagraph = document.createElement("p");
    equationParagraph.classList.add("equation-paragraph");
    equationParagraph.textContent = item.equation;
    equations.appendChild(equationParagraph);
  });
}

// display countdown page
function displayCountdown() {
  form.style.display = "none";
  countdownPage.style.display = "flex";

  let countdown = 3;
  countdownPage.textContent = countdown;
  const countdownInterval = setInterval(function () {
    countdown--;
    if (countdown === 0) {
      countdown = "Go!";
      countdownPage.textContent = countdown;
      clearInterval(countdownInterval);
      setTimeout(displayEquations, 1000);
    }
    countdownPage.textContent = countdown;
  }, 1000);
}

//scroll equations element
function scroll() {
  scrollEquationsEl += 61;
  equations.scroll(0, scrollEquationsEl);

  if (playerGuess.length === equationsArray.length) {
    equations.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    equationsPage.style.display = "none";
    scorePage.style.display = "flex";
    calculateScores();
  }
}

// calculate scores and stop timer
function calculateScores() {
  clearInterval(passTimeInterval);
  equationsArray.forEach((item, index) => {
    if (item.validity !== playerGuess[index]) {
      penaltyTime += 0.5;
    }
  });
  scoreToDOM();
}

//reset
function reset() {
  form.style.display = "flex";
  scorePage.style.display = "none";
  inputValue;
  equationsArray = [];
  scrollEquationsEl = 0;
  userCorrectInput = 0;
  userWrongInput = 0;
  playerGuess = [];
  baseTime = 0;
  passTimeInterval = setInterval;
  equations.innerHTML = "";
  penaltyTime = 0;
  questionsContainer.forEach((container) => {
    container.classList.remove("checked");
  });
}

//events
form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputs.forEach((input) => {
    if (input.checked) {
      inputValue = input.value;
    }
  });
  if (inputValue !== undefined) {
    displayCountdown();
  }
});
trueButton.addEventListener("click", function () {
  userCorrectInput++;
  playerGuess.push("true");
  scroll();
});
wrongButton.addEventListener("click", function () {
  userWrongInput++;
  playerGuess.push("false");
  scroll();
});
startAgainButton.addEventListener("click", reset);

// all inputs listener
inputs.forEach((input, index) => {
  input.addEventListener("click", () => {
    questionsContainer.forEach((container) => {
      container.classList.remove("checked");
    });
    if (input.checked) {
      questionsContainer[index].classList.add("checked");
    }
  });
});
