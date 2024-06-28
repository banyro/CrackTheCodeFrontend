const BASE_URL= 'http://localhost:8080/CrackTheCode/'
function overlaySettings() {
  const elem = document.getElementById("overlaySettings");
  elem.classList.toggle("hidden");
}

function overlayHelp() {
  const elem = document.getElementById("overlayHelp");
  elem.classList.toggle("hidden");
}

function autoScroll() {
  const autoScroll = document.getElementById("output");
  autoScroll.scrollTop = autoScroll.scrollHeight;
}

let currentLevel = 1;
let trys1 = 1;
let trys2 = 1;
let trys3 = 1;

function won(ele) {
  const op = document.getElementById("output");
  const newP = document.createElement("p");
  newP.setAttribute("class","feedback");
  op.appendChild(newP);
  newP.innerHTML = "You needed " + (trys1 + trys2 + trys3) + " trys in total. Type in a number to restart.";
  autoScroll();
  currentLevel = -1;
  trys1 = 1;
  trys2 = 1;
  trys3 = 1;
}

function Reset(guessedString) {
const data = new URLSearchParams();
  data.append("guessedString", guessedString);
  fetch(BASE_URL + "reset", {
    method: "POST",
    body: data
  })
  .then(response => response.json())
  .then(data => {
      displayFeedback(data);
  console.log(data)
  currentLevel = currentLevel + 1;
  })
  .catch(error => console.error(error));
}

function Levels(guessedString) {
const data = new URLSearchParams();
  data.append("guessedString", guessedString);
  fetch(BASE_URL + "level" + currentLevel, {
    method: "POST",
    body: data
  })
  .then(response => response.json())
  .then(data => {
      displayFeedback(data);
  console.log(data)
    if (data.isCorrect == true) {
      const op = document.getElementById("output");
      const newP = document.createElement("p");
      newP.setAttribute("class","feedback");
      op.appendChild(newP);
      if (currentLevel == 1) {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys1 + " try(s).";
      }
      else if (currentLevel == 2) {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys2 + " try(s).";
      }
      else {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys3 + " try(s).";
        won();
      }
      autoScroll();
      currentLevel = currentLevel + 1;
    }
    else {
      if (currentLevel == 1) {
        trys1 = trys1 + 1;
      }
      else if (currentLevel == 2) {
        trys2 = trys2 + 1;
      }
      else {
        trys3 = trys3 + 1;
      }
    }
  })
  .catch(error => console.error(error));
}

function guess(ele) {
  if (event.key === "Enter" && ele.value != "" && ele.value >= 0 && ele.value < 100 || ele.value == "reset" || ele.value == "secret" || ele.value == "prank") {
    if (ele.value == "secret") {
      const elem = document.getElementById("img");
      elem.classList.toggle("hidden");
      ele.value = "0";
    }
    else if (ele.value == "prank") {
      const elem = document.getElementById("img");
      elem.classList.toggle("prank");
      ele.value = "0";
    }
    displayInput(ele);
    if (currentLevel == 0) {
      Reset(ele.value);
    }
    else {
      Levels(ele.value);
    }
    ele.value = "";
  }
}

function displayFeedback(data) {
  const op = document.getElementById("output");
  const newP = document.createElement("p");
  newP.setAttribute("class","feedback");
  op.appendChild(newP);
  newP.innerHTML = data.feedback;
  autoScroll();
}

function displayInput(ele) {
  const op = document.getElementById("output");
  const newP = document.createElement("p");
  newP.setAttribute("class","answers");
  op.appendChild(newP);
  let answerArray = ["Is it ", "What about ", "Could it be ", "Maybe it is ", "Have I tried ", "I think it is ", "I guess it is ", "It must be ", "Well then it is "]
  if (ele.value != "reset" && currentLevel != 0) {
    newP.innerHTML = answerArray[Math.floor(Math.random() * 9)] + ele.value + "?";
  }
  else if (currentLevel == 0) {
    newP.innerHTML = "I want to restart."
  }
  else {
    newP.innerHTML = "I want to reset the current number."
  }
  autoScroll();
}
