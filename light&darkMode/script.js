const htmlElement = document.documentElement;
const toggleLabel = document.querySelector(".switch");
const checkbox = document.querySelector("input[type=checkbox]");

const span = document.querySelector(".span");
const modeIcon = document.querySelector("#mode-icon");
const image1 = document.querySelector("#image-1");
const image2 = document.querySelector("#image-2");
const image3 = document.querySelector("#image-3");

//getting mode status from localStorage
const modeStatus = localStorage.getItem("mode");
if (modeStatus) {
  if (modeStatus === "dark") {
    checkbox.checked = true;
    darkMode();
  } else {
    lightMode();
    checkbox.checked = false;
  }
}

//light mode function
function lightMode() {
  htmlElement.removeAttribute("dark-theme");
  span.textContent = "Light Mode";
  modeIcon.classList.replace("fa-moon", "fa-sun");
  image1.setAttribute("src", "./img/first-light.svg");
  image2.setAttribute("src", "./img/second-light.svg");
  image3.setAttribute("src", "./img/third-light.svg");
}

//Dark mode function
function darkMode() {
  htmlElement.setAttribute("dark-theme", "dark");
  span.textContent = "Dark Mode";
  modeIcon.classList.replace("fa-sun", "fa-moon");
  image1.setAttribute("src", "./img/first-dark.svg");
  image2.setAttribute("src", "./img/second-dark.svg");
  image3.setAttribute("src", "./img/third-dark.svg");
}

checkbox.addEventListener("change", function (e) {
  if (e.target.checked) {
    darkMode();
    localStorage.setItem("mode", "dark");
  } else {
    lightMode();
    localStorage.setItem("mode", "light");
  }
});
