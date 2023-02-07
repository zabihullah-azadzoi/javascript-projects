const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more");
const favoriteEl = document.querySelector(".favorites");
const successPopup = document.querySelector(".success-popup");
const header = document.querySelector(".header");
const dotEl = document.querySelector(".dot");
const apiKey = "DEMO_KEY";
const count = 10;

const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let pageFlag = "";

let favorites;
if (localStorage.getItem("favorites") !== null) {
  favorites = JSON.parse(localStorage.getItem("favorites"));
  favoriteEl.style.cursor = "pointer";
} else {
  favoriteEl.style.cursor = "not-allowed";
  favorites = [];
}

//redering data
function renderData(array) {
  dotEl.hidden = false;
  favoriteEl.hidden = false;
  loadMore.textContent = "Load More";
  container.innerHTML = "";
  array.forEach((item, index) => {
    const card = document.createElement("div");
    const anchorTag = document.createElement("a");
    const image = document.createElement("img");
    const h2 = document.createElement("h2");
    const addToFavorites = document.createElement("p");
    const description = document.createElement("p");
    const date = document.createElement("p");

    //card
    card.classList.add("card");

    //anchorTag
    anchorTag.setAttribute("href", item.hdurl);
    anchorTag.setAttribute("target", "_blank");
    anchorTag.appendChild(image);
    //image
    image.src = item.url;
    image.classList.add("image");
    //h2
    h2.textContent = item.title;
    h2.classList.add("img-title");
    //add to favorites
    addToFavorites.classList.add("add-to-favorites");
    if (pageFlag === "generalPage") {
      addToFavorites.textContent = "Add to Favorites";
      //adding favorite to local storage
      addToFavorites.addEventListener("click", function () {
        saveFavorite(item);
      });
    } else if (pageFlag === "StorgePage") {
      addToFavorites.textContent = "Remove Favorite";
      addToFavorites.addEventListener("click", function () {
        removeFavorite(index);
      });
    }
    //description
    description.textContent = item.explanation;
    description.classList.add("description");
    //date
    date.textContent = item.date;
    date.classList.add("date");
    //appending childs
    card.appendChild(anchorTag);
    card.appendChild(h2);
    card.appendChild(addToFavorites);
    card.appendChild(description);
    card.appendChild(date);
    container.appendChild(card);
  });
}

async function request() {
  pageFlag = "generalPage";
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    const jsonFile = await response.json();
    renderData(jsonFile);
  } catch (error) {
    console.log(error);
  }
  loader.classList.add("hidden");
}
request();

//rendering local storage data
function renderLocalStorageData() {
  if (localStorage.getItem("favorites")) {
    pageFlag = "StorgePage";
    const itemsArray = JSON.parse(localStorage.getItem("favorites"));
    renderData(itemsArray);
    favoriteEl.hidden = true;
    dotEl.hidden = true;
    loadMore.textContent = "Load more NASA photos";
  }
}

//adding favorite to local storage
function saveFavorite(item) {
  const result = favorites.find(function (value) {
    return value.title === item.title;
  });
  if (result === null || result === undefined) {
    const favorite = {
      hdurl: item.hdurl,
      url: item.url,
      title: item.title,
      explanation: item.explanation,
      date: item.date,
    };
    favorites.push(favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    successPopup.hidden = false;
    setTimeout(function () {
      successPopup.hidden = true;
    }, 2000);
  }
}

//remove favorite from local storage
function removeFavorite(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderLocalStorageData();
}

//events
loadMore.addEventListener("click", request);
favoriteEl.addEventListener("click", renderLocalStorageData);
