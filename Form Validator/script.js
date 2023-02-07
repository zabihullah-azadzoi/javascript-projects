const form = document.getElementById("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const messageBox = document.getElementById("message");

//Flags
let isValid = false;
let passwordMatches = false;

//store form data
function storeData() {
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    url: form.url.value,
    password: form.password.value,
  };
  console.log(data);
}

//form validation
function validation(e) {
  e.preventDefault();
  isValid = form.checkValidity();
  if (!isValid) {
    messageBox.textContent = "Please fill out all fields";
    messageBox.style.borderColor = "red";
    messageBox.style.color = "red";
    return;
  }

  const pass1 = password.value;
  const pass2 = confirmPassword.value;

  pass1 === pass2 ? (passwordMatches = true) : (passwordMatches = false);

  if (!passwordMatches) {
    messageBox.textContent = "Password doesn't match!";
    messageBox.style.borderColor = "red";
    messageBox.style.color = "red";
    confirmPassword.value = "";
    return;
  } else if (passwordMatches && isValid) {
    messageBox.textContent = "Succeessfully Registered!";
    messageBox.style.borderColor = "green";
    messageBox.style.color = "green";
    storeData();
    form.reset();
  }
}

// events
form.addEventListener("submit", validation);
