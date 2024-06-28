 let randomNumber1;
 function level1(guessedString) {
        if (guessedString === "reset") {
            rng1();
            return new Feedback("The number was reset.", false);
        }
        try {
            guessedNumber = parseInt(guessedString);
        }
        catch {
            return new Feedback("Please type in numbers.", false);
        }
        guessedNumber = parseInt(guessedString);
        console.log(guessedNumber);
        console.log(guessedNumber);
        if (guessedNumber > randomNumber1) {
            console.log(guessedNumber + " is too high.");
            return  new Feedback(guessedNumber + " is too high.", false);
        }
        else if (guessedNumber < randomNumber1) {
            console.log(guessedNumber + " is too low.");
           return  new Feedback(guessedNumber + " is too low.", false);
        }
        else {
            console.log(guessedNumber + " was the secret number.");
            return  new Feedback(guessedNumber + " was the secret number.", true);
        }
    }

    function rng1() {
        randomNumber1 = Math.floor(Math.random() * 99 + 1);
    }
 rng1();
