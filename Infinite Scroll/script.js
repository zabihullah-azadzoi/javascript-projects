const accessKey = "If2Yy7gUUr2RXTdW2b4HqQ_9Ew2ZFqGNbxegg6j48gc";
let photosCount = 30;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&&count=${photosCount}`;
const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
let totalImages = 0;
let imagesLoaded = 0;
let ready = false;
let photosArray = [];

function imageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    imagesLoaded = 0;
  }
}

// rendering each photo
function renderPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    // creating anchor tag for photo
    const anchorTag = document.createElement("a");
    anchorTag.setAttribute("href", photo.links.html);
    anchorTag.setAttribute("target", "_blank");

    // creating image element
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("title", photo.alt_description);

    // check if the image is loaded
    img.addEventListener("load", imageLoad);

    anchorTag.appendChild(img);
    container.appendChild(anchorTag);
  });
}

// Making API request
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data;
    renderPhotos();
  } catch (error) {
    console.log("something is wrong", error);
  }
}
getPhotos();

window.addEventListener("scroll", function (e) {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    console.log(photosCount);
    ready = false;
  }
});
