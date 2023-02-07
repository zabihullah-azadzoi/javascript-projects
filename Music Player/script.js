const audioElement = document.querySelector(".audio");
const playPauseElement = document.querySelector("#play");
const previousElement = document.querySelector("#previous");
const nextElement = document.querySelector("#next");
const audioName = document.querySelector(".audio-name");
const singerName = document.querySelector(".singer-name");
const imageElement = document.querySelector("#song-image");
const progressUpdate = document.querySelector(".progress-update");
const progressEnd = document.querySelector(".progress-end");
const progressProgressing = document.querySelector(".progress-progressing");
const progressBar = document.querySelector(".progress-bar");

let isPlaying = false;
let nextSong = 1;

//songs info object
const songsInfo = [
  {
    name: "audio-1",
    displayName: "Chi ta raghli",
    singer: "Ahmad",
  },
  {
    name: "audio-2",
    displayName: "Quraishi Janan",
    singer: "Mahmood",
  },
];

// play or pause audio
function playOrPause() {
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
    playPauseElement.classList.replace("fa-pause", "fa-play");
  } else {
    audioElement.play();
    isPlaying = true;
    playPauseElement.classList.replace("fa-play", "fa-pause");
  }
}

//displaySongInfo
function displayInfo(nextSong) {
  const currentSongInfo = songsInfo[nextSong - 1];
  audioName.textContent = currentSongInfo.displayName;
  singerName.textContent = currentSongInfo.singer;
  audioElement.src = `./audio/audio-${nextSong}.mp3`;
  imageElement.src = `./img/image-${nextSong}.jpg`;
  audioElement.play();
}

//next song
function next() {
  nextSong++;
  if (nextSong > 2) {
    nextSong = 1;
  }
  displayInfo(nextSong);
}
//previous song
function previous() {
  nextSong--;
  if (nextSong < 1) {
    nextSong = 1;
  }
  displayInfo(nextSong);
}

//display Time
function displayTime() {
  let durationMinutes = Math.floor(audioElement.duration / 60);
  let durationSeconds = Math.floor(audioElement.duration % 60);
  let currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
  let currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
  currentTimeSeconds < 10
    ? (progressUpdate.textContent = `${currentTimeMinutes}:0${currentTimeSeconds}`)
    : (progressUpdate.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`);
  if (durationMinutes && durationSeconds) {
    durationSeconds < 10
      ? (progressEnd.textContent = `${durationMinutes}:0${durationSeconds}`)
      : (progressEnd.textContent = `${durationMinutes}:${durationSeconds}`);
  }
  let progressPercentage =
    (audioElement.currentTime * 100) / audioElement.duration;
  progressProgressing.style.width = `${progressPercentage}%`;
}

// change current time on click
function currentTimeOnClick(e) {
  let percentage = (e.offsetX * 100) / this.clientWidth;
  let currentPercentage = (audioElement.duration * percentage) / 100;
  audioElement.currentTime = currentPercentage;
}

playPauseElement.addEventListener("click", playOrPause);
nextElement.addEventListener("click", next);
previousElement.addEventListener("click", previous);
audioElement.addEventListener("timeupdate", displayTime);
progressBar.addEventListener("click", currentTimeOnClick);
audioElement.addEventListener("ended", next);
