const overlay = document.querySelector("#overlay");
const checkbox = document.querySelector("#checkbox");
const navigationList = document.querySelector("#navigation-list");

const item1 = document.querySelector(".item-1");
const item2 = document.querySelector(".item-2");
const item3 = document.querySelector(".item-3");
const item4 = document.querySelector(".item-4");
const item5 = document.querySelector(".item-5");
const items = [item1, item2, item3, item4, item5];

function startOrEndAnimation(direction1, direction2) {
  items.forEach((item, index) => {
    item.classList.replace(
      `item-${index + 1}-animation-${direction1}`,
      `item-${index + 1}-animation-${direction2}`
    );
  });
}

function toggle() {
  overlay.classList.toggle("overlay-hide-mode");
  navigationList.classList.toggle("navigation-list-hide-mode");
  if (navigationList.classList.contains("navigation-list-hide-mode")) {
    startOrEndAnimation("end", "start");
  } else {
    startOrEndAnimation("start", "end");
  }
}
checkbox.addEventListener("change", toggle);
items.forEach((item) => {
  item.addEventListener("click", toggle);
});
