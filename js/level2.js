let randomNumber2_1;
let randomNumber2_2;
let randomString2_1;
let randomString2_2;

function rng2() {
    randomNumber2_1 = Math.floor(Math.random() * 10);
    randomNumber2_2 = Math.floor(Math.random() * 10);
    if (randomNumber2_1 === 0 && randomNumber2_2 === 0) {
        randomNumber2_2 = 1;
    }
    randomString2_1 = randomNumber2_1.toString();
    randomString2_2 = randomNumber2_2.toString();
}

function level2(guessedString) {
    if (guessedString === "reset") {
        rng2();
        return new Feedback("The number was reset.", false);
    }

    let guessedNumber;
    try {
        guessedNumber = parseInt(guessedString);
        if (isNaN(guessedNumber)) throw new Error();
    } catch (e) {
        throw new Error("Please type in numbers.");
    }

    if (guessedNumber >= 0 && guessedNumber <= 9) {
        guessedString = guessedNumber.toString();
        guessedString = "0" + guessedString;
    }

    let guessedArray = guessedString.split('');

    let guessedChar1 = guessedArray[0];
    let guessedChar2 = guessedArray[1];

    if (guessedChar1 === randomString2_1 && guessedChar2 === randomString2_2) {
        console.log(guessedChar1 + guessedChar2 + " was the secret number.");
        return new Feedback(guessedChar1 + guessedChar2 + " was the secret number.", true);
    } else if (guessedChar1 !== randomString2_1 && guessedChar1 !== randomString2_2 && guessedChar2 !== randomString2_1 && guessedChar2 !== randomString2_2) {
        console.log("Neither " + guessedChar1 + " nor " + guessedChar2 + " are in the number.");
        return new Feedback("Neither " + guessedChar1 + " nor " + guessedChar2 + " are in the number.", false);
    } else if (guessedChar1 !== randomString2_1 && guessedChar1 === randomString2_2 && guessedChar2 !== randomString2_1 && guessedChar2 !== randomString2_2) {
        console.log(guessedChar1 + " is at the wrong place. " + guessedChar2 + " isn't in the number.");
        return new Feedback(guessedChar1 + " is at the wrong place. " + guessedChar2 + " isn't in the number.", false);
    } else if (guessedChar1 === randomString2_1) {
        console.log(guessedChar1 + " is at the correct place. " + guessedChar2 + " isn't in the number.");
        return new Feedback(guessedChar1 + " is at the correct place. " + guessedChar2 + " isn't in the number.", false);
    } else if (guessedChar1 !== randomString2_2 && guessedChar2 === randomString2_1 && guessedChar2 !== randomString2_2) {
        console.log(guessedChar1 + " isn't in the number. " + guessedChar2 + " is at the wrong place.");
        return new Feedback(guessedChar1 + " isn't in the number. " + guessedChar2 + " is at the wrong place.", false);
    } else if (guessedChar1 === randomString2_2 && guessedChar2 === randomString2_1) {
        console.log("Both " + guessedChar1 + " and " + guessedChar2 + " are at the wrong place.");
        return new Feedback("Both " + guessedChar1 + " and " + guessedChar2 + " are at the wrong place.", false);
    } else {
        console.log(guessedChar1 + " isn't in the number. " + guessedChar2 + " is at the correct place.");
        return new Feedback(guessedChar1 + " isn't in the number. " + guessedChar2 + " is at the correct place.", false);
    }
}
rng2();
