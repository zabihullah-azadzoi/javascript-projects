//disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// text to speech
function jokeToSpeech(joke) {
  VoiceRSS.speech({
    key: "8dbd94156ccf401e9615621620f836dc",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// joke api
const apiUrl =
  "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
async function getJoke() {
  let joke = "";
  const response = await fetch(
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist"
  );
  const data = await response.json();
  if (data.setup) {
    joke = data.setup + data.delivery;
  } else {
    joke = data.joke;
  }
  jokeToSpeech(joke);
  toggleButton();
}
audioElement.addEventListener("ended", toggleButton);
button.addEventListener("click", getJoke);
