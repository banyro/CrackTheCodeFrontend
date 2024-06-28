let randomNumber3_1;
let randomNumber3_2;
let randomString3_1;
let randomString3_2;

function rng3() {
    randomNumber3_1 = Math.floor(Math.random() * 10);
    randomNumber3_2 = Math.floor(Math.random() * 10);
    if (randomNumber3_1 === 0 && randomNumber3_2 === 0) {
        randomNumber3_2 = 1;
    }
    randomString3_1 = randomNumber3_1.toString();
    randomString3_2 = randomNumber3_2.toString();
}

function level3(guessedString) {
    if (guessedString === "reset") {
        rng();
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
        guessedString = "0" + guessedNumber;
    } else {
        guessedString = guessedNumber.toString();
    }

    const [guessedChar1, guessedChar2] = guessedString.split('').map(Number);

    const isGuessedChar1Correct = guessedChar1 === randomNumber3_1;
    const isGuessedChar2Correct = guessedChar2 === randomNumber3_2;
    const guessedChar1OffBy = Math.abs(randomNumber3_1 - guessedChar1);
    const guessedChar2OffBy = Math.abs(randomNumber3_2 - guessedChar2);

    if (!isGuessedChar1Correct && !isGuessedChar2Correct) {
        const message = `${guessedChar1} was off by ${guessedChar1OffBy}. ${guessedChar2} was off by ${guessedChar2OffBy}.`;
        console.log(message);
        return new Feedback(message, false);
    } else if (isGuessedChar1Correct && !isGuessedChar2Correct) {
        const message = `${guessedChar1} is correct. ${guessedChar2} was off by ${guessedChar2OffBy}.`;
        console.log(message);
        return new Feedback(message, false);
    } else if (!isGuessedChar1Correct && isGuessedChar2Correct) {
        const message = `${guessedChar1} was off by ${guessedChar1OffBy}. ${guessedChar2} is correct.`;
        console.log(message);
        return new Feedback(message, false);
    } else {
        const message = `${guessedChar1}${guessedChar2} was the secret number.`;
        console.log(message);
        return new Feedback(message, true);
    }
}
rng3();
