const newBookmarkButton = document.querySelector(".add-new-bookmark");
const newBookmarkContainer = document.querySelector(".new-bookmark-container");
const closeNewBookmarkContainer = document.querySelector(
  ".close-add-bookmark-button"
);
const submitButton = document.querySelector(".submit-button");
const bookmarkNameElement = document.getElementById("bookmark-name");
const bookmarkUrlElement = document.getElementById("bookmark-url");
const allBookmarks = document.querySelector(".all-bookmarks");

//all bookmarks
let bookmarksArray = [];
if (JSON.parse(localStorage.getItem("bookmarks"))) {
  bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
}

//save userdata to localstorage
function saveBookmark() {
  const bookmarkName = bookmarkNameElement.value;
  let bookmarkUrl = bookmarkUrlElement.value;
  if (!bookmarkUrl.includes("http://") && !bookmarkUrl.includes("https://")) {
    bookmarkUrl = `http://${bookmarkUrlElement.value}`;
  } else {
    bookmarkUrl = bookmarkUrlElement.value;
  }
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regexp = new RegExp(expression);

  if (bookmarkName !== "" && bookmarkUrl !== "") {
    if (!bookmarkUrl.match(regexp)) {
      alert("Please provide a valid URL!");
    } else {
      const newBookmark = {
        name: bookmarkName,
        url: bookmarkUrl,
      };
      console.log(newBookmark);
      bookmarksArray.push(newBookmark);
      const jsonData = JSON.stringify(bookmarksArray);
      localStorage.setItem("bookmarks", jsonData);
      allBookmarks.innerHTML = "";
      renderBookmarks();
      bookmarkNameElement.value = "";
      bookmarkUrlElement.value = "";
      bookmarkNameElement.focus();
    }
  } else {
    alert("Please add a Name and URL!");
  }
}

//rendering localstorage data
function renderBookmarks() {
  allBookmarks.innerHTML = "";
  bookmarksArray.forEach(function (item, index) {
    const label = document.createElement("label");
    const anchorElement = document.createElement("a");
    const deleteItem = document.createElement("p");

    label.classList.add("item-label");

    //anchor element
    anchorElement.textContent = item.name;
    anchorElement.setAttribute("href", item.url);
    anchorElement.setAttribute("target", "_blank");

    //deletebutton element
    deleteItem.textContent = "X";
    deleteItem.classList.add("bookmark-delete-button");
    label.appendChild(deleteItem);

    //removing the item using deletebutton
    deleteItem.addEventListener("click", function () {
      bookmarksArray.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray));
      renderBookmarks();
    });

    label.appendChild(anchorElement);
    allBookmarks.appendChild(label);
  });
}
renderBookmarks();
// events
newBookmarkButton.addEventListener("click", function () {
  newBookmarkContainer.style.display = "flex";
});
closeNewBookmarkContainer.addEventListener("click", function () {
  newBookmarkContainer.style.display = "none";
});
submitButton.addEventListener("click", saveBookmark);
