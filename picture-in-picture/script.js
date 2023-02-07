const videoElement = document.querySelector(".video");
const button = document.querySelector(".button");
async function videoStream() {
  try {
    const resolve = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = resolve;
    videoElement.onloadedmetadata = function () {
      videoElement.play();
    };
  } catch (error) {
    console.log("error", error);
  }
}

videoStream();
document.querySelector(".button").addEventListener("click", async function () {
  try {
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
  } catch (error) {
    console.log("Error", error);
  }
});
