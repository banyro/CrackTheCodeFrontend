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
  currentLevel = 0;
  trys1 = 1;
  trys2 = 1;
  trys3 = 1;
}

function Levels(guessedString) {
const data = new URLSearchParams();
  if (currentLevel == 1) {
    const level1Response = level1(guessedString);
    console.log(level1Response);
    handleLevelResponse(level1Response);
 }
 else if (currentLevel == 2) {
   const level2Response = level2(guessedString);
   console.log(level2Response);
   handleLevelResponse(level2Response);
 }
 else if (currentLevel == 3) {
    const level3Response = level3(guessedString);
    console.log(level3Response);
    handleLevelResponse(level3Response);
  }
}

function handleLevelResponse(data) {
      displayFeedback(data);
  console.log(data)
    if (data.isCorrect == true) {
      const op = document.getElementById("output");
      const newP = document.createElement("p");
      newP.setAttribute("class","feedback");
      op.appendChild(newP);
      if (currentLevel == 1) {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys1 + " try(s).";
        rng1();
      }
      else if (currentLevel == 2) {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys2 + " try(s).";
        rng2();
      }
      else if (currentLevel == 3) {
        newP.innerHTML = "You finished level " + currentLevel + " in " + trys3 + " try(s).";
        rng3();
        won();
      }
      autoScroll();
      currentLevel = currentLevel + 1;
    }
    else {
      if (currentLevel == 0) {
        currentLevel = currentLevel + 1;
      }
      else if (currentLevel == 1) {
        trys1 = trys1 + 1;
      }
      else if (currentLevel == 2) {
        trys2 = trys2 + 1;
      }
      else if (currentLevel == 3) {
        trys3 = trys3 + 1;
      }
    }
}

function guess(ele) {
  if (event.key === "Enter" && ele.value != "" && ele.value >= 0 && ele.value < 100 || ele.value == "reset" || ele.value == "secret" || ele.value == "prank" || ele.value == "prank2") {
    if (ele.value == "secret") {
      const cat = document.getElementById("img");
      cat.classList.toggle("hidden");
      ele.value = "0";
    }
    else if (ele.value == "prank") {
      const prank = document.getElementById("input");
      prank.classList.toggle("prank");
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

function Feedback(feedback, isCorrect) {
    this.feedback = feedback;
    this.isCorrect = isCorrect;
}
