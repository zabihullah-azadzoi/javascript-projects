import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const userRock = document.querySelector(".user-rock");
const userPaper = document.querySelector(".user-paper");
const userScissors = document.querySelector(".user-scissors");
const userLizard = document.querySelector(".user-lizard");
const userSpock = document.querySelector(".user-spock");
const message = document.querySelector(".message");
const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");
const resetButton = document.getElementById("reset-button");
const computerRock = document.querySelector(".computer-rock");
const computerPaper = document.querySelector(".computer-paper");
const computerScissors = document.querySelector(".computer-scissors");
const computerLizard = document.querySelector(".computer-lizard");
const computerSpock = document.querySelector(".computer-spock");

const userItems = [userRock, userPaper, userScissors, userLizard, userSpock];

const allItems = document.querySelectorAll(".far");

let computerValue = "";
let userScoreValue = 0;
let computerScoreValue = 0;

const choices = {
  rock: {
    name: "rock",
    defeats: ["scissors", "lizard"],
  },
  paper: {
    name: "paper",
    defeats: ["rock", "spock"],
  },
  scissors: {
    name: "scissors",
    defeats: ["paper", "lizard"],
  },
  lizard: {
    name: "lizard",
    defeats: ["paper", "spock"],
  },
  spock: {
    name: "spock",
    defeats: ["scissors", "rock"],
  },
};

function computerSelection() {
  let randomNumber = Math.random();
  if (randomNumber < 0.2) {
    computerRock.classList.add("color-changer");
    computerValue = "rock";
  } else if (randomNumber <= 0.4) {
    computerPaper.classList.add("color-changer");
    computerValue = "paper";
  } else if (randomNumber <= 0.6) {
    computerScissors.classList.add("color-changer");
    computerValue = "scissors";
  } else if (randomNumber <= 0.8) {
    computerLizard.classList.add("color-changer");
    computerValue = "lizard";
  } else {
    computerSpock.classList.add("color-changer");
    computerValue = "spock";
  }
}

function action(item) {
  selectItem();
  const result = userItems.find((value) => {
    return value.id === item;
  });
  result.classList.add("color-changer");
  computerSelection();
  if (computerValue === item) {
    message.textContent = "Tie";
    stopConfetti();
    removeConfetti();
  } else {
    switch (item) {
      case "rock":
        messageText(choices.rock.defeats.includes(computerValue));
        break;
      case "paper":
        messageText(choices.paper.defeats.includes(computerValue));
        break;
      case "scissors":
        messageText(choices.scissors.defeats.includes(computerValue));
        break;
      case "lizard":
        messageText(choices.lizard.defeats.includes(computerValue));
        break;
      case "spock":
        messageText(choices.spock.defeats.includes(computerValue));
    }
  }
}

// change selected items's color
function selectItem() {
  allItems.forEach((item) => {
    item.classList.remove("color-changer");
  });
}

//reset game
function resetGame() {
  allItems.forEach((item) => {
    item.classList.remove("color-changer");
  });
  computerScore.textContent = "Computer score -- 0 -";
  userScore.textContent = "User score -- 0 -";
  message.textContent = "";
  stopConfetti();
  removeConfetti();
}
resetGame();

function messageText(value) {
  if (value) {
    message.textContent = "You Won!";
    userScoreValue++;
    userScore.textContent = `User Score -- ${userScoreValue} -`;
    startConfetti();
  } else {
    message.textContent = "You Lost!";
    computerScoreValue++;
    computerScore.textContent = `Computer Score -- ${computerScoreValue} -`;
    stopConfetti();
    removeConfetti();
  }
}
//events
userRock.addEventListener("click", function () {
  action("rock");
});

userPaper.addEventListener("click", function () {
  action("paper");
});
userScissors.addEventListener("click", function () {
  action("scissors");
});
userLizard.addEventListener("click", function () {
  action("lizard");
});
userSpock.addEventListener("click", function () {
  action("spock");
});
resetButton.addEventListener("click", resetGame);
