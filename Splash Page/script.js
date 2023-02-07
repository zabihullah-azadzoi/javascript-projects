const body = document.body;
const backgroundOne = document.querySelector(".background-1");
const backgroundTwo = document.querySelector(".background-2");
const backgroundThree = document.querySelector(".background-3");

let previousBackground;
//change background function
function changeBackground(num) {
  previousBackground = body.className;
  body.classList = "";
  switch (num) {
    case "1":
      previousBackground === "background-1"
        ? body.classList.remove("background-1")
        : body.classList.add("background-1");
      break;
    case "2":
      previousBackground === "background-2"
        ? body.classList.remove("background-2")
        : body.classList.add("background-2");
      break;
    case "3":
      previousBackground === "background-3"
        ? body.classList.remove("background-3")
        : body.classList.add("background-3");
      break;
    default:
      break;
  }
}
backgroundOne.addEventListener("click", function () {
  changeBackground("1");
});
backgroundTwo.addEventListener("click", function () {
  changeBackground("2");
});
backgroundThree.addEventListener("click", function () {
  changeBackground("3");
});
