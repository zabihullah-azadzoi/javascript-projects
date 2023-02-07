const video = document.querySelector(".video");
const videoPlayer = document.querySelector(".video-player");
const playElement = document.querySelector(".fa-play");
const muteElement = document.querySelector(".mute-element");
const playbackList = document.querySelector(".playback-dropdown");
const durationControler = document.querySelector(".duration-controler");
const fullscreenButton = document.querySelector(".fullscreen-button");
const videoProgressTracker = document.querySelector(".video-progress-tracker");
const videoProgressbar = document.querySelector(".video-progressbar");
const videoVolumebar = document.querySelector(".video-volumebar");
const videoVolumeTracker = document.querySelector(".video-volume-tracker");

let videoFlag = false;
let videoSoundFlag = false;
let videoFullscreenFlag = false;

//play/pause video
function playPauseVideo() {
  if (!videoFlag) {
    video.play();
    videoFlag = true;
    playElement.classList.replace("fa-play", "fa-pause");
    videoVolumeTracker.style.width = `${60}%`;
  } else {
    video.pause();
    videoFlag = false;
    playElement.classList.replace("fa-pause", "fa-play");
  }
}

//mute video
function muted() {
  if (!videoSoundFlag) {
    video.muted = true;
    videoSoundFlag = true;
    muteElement.classList.replace("fa-volume-up", "fa-volume-mute");
    videoVolumeTracker.style.width = `${0}%`;
  } else {
    video.muted = false;
    videoSoundFlag = false;
    videoVolumeTracker.style.width = `${video.volume * 100}%`;
    muteElement.classList.replace("fa-volume-mute", "fa-volume-up");
  }
}
//playback speed controler
function playbackSpeed(e) {
  if (e.target.value === "smallest") {
    video.playbackRate = 0.5;
  } else if (e.target.value === "small") {
    video.playbackRate = 0.75;
  } else if (e.target.value === "normal") {
    video.playbackRate = 1;
  } else if (e.target.value === "large") {
    video.playbackRate = 1.5;
  } else if (e.target.value === "largest") {
    video.playbackRate = 2;
  }

  console.log(video.playbackRate);
}

// video duration
function duration() {
  const durationMinutes = Math.floor(video.duration / 60);
  const durationSeconds = Math.floor(video.duration % 60);
  const currentTimeMinutes = Math.floor(video.currentTime / 60);
  const currentTimeSeconds = Math.floor(video.currentTime % 60);
  const currentTimePercentage = (video.currentTime * 100) / video.duration;
  durationControler.textContent = `${currentTimeMinutes}:${currentTimeSeconds} / ${durationMinutes}:${durationSeconds}`;
  videoProgressTracker.style.width = `${currentTimePercentage}%`;
}

//video fullscreen control
function fullscreenRequest() {
  if (!videoFullscreenFlag) {
    videoPlayer.requestFullscreen();
    videoFullscreenFlag = true;
    fullscreenButton.classList.replace("fa-expand", "fa-compress");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    videoFullscreenFlag = false;
    fullscreenButton.classList.replace("fa-compress", "fa-expand");
  }
}

//go to a desired time on click
function onClickProgress(e) {
  const progressClick = (e.offsetX * 100) / videoProgressbar.clientWidth;
  const currentTimeInSeconds = (video.duration * progressClick) / 100;
  video.currentTime = currentTimeInSeconds;
}

//volume control on click
function volumeOnClick(e) {
  const progressClick = (e.offsetX * 100) / videoVolumebar.clientWidth;
  const volumeValue = progressClick / 100;
  videoVolumeTracker.style.width = `${progressClick}%`;
  video.volume = volumeValue;
}

//events
video.addEventListener("click", playPauseVideo);
playElement.addEventListener("click", playPauseVideo);
muteElement.addEventListener("click", muted);
playbackList.addEventListener("change", playbackSpeed);
video.addEventListener("timeupdate", duration);
fullscreenButton.addEventListener("click", fullscreenRequest);
videoProgressbar.addEventListener("click", onClickProgress);
videoVolumebar.addEventListener("click", volumeOnClick);
video.addEventListener("dblclick", fullscreenRequest);
