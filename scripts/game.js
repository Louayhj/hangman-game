const words = ["Python","html","css","bootstrap","js"];
const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
};


const displayDashes = (word) => word.replace(/[A-Z]/g, "-");
const updateAnswer = (word, guessedLetters) =>
  word.replace(/[A-Z]/g, (letter) => (guessedLetters.includes(letter) ? letter : "-"));


const isCorrectGuess = (word, guessedLetter) => word.includes(guessedLetter);


const startNewGame = () => {
 
  const randomWord = getRandomWord();
  const dashes = displayDashes(randomWord);
  const answerSection = document.getElementById("answer-section");
  answerSection.innerHTML = dashes;


  const guessedLetters = [];
  let incorrectGuesses = 0;

//created an array with the functions implemented on hang.js by order to call them on wrong input 
  const hangmanFunctions = [head, body, leftHand, rightHand, leftLeg, rightLeg];


  const handleIncorrectGuess = (incorrectGuesses, hangmanFunctions, randomWord) => {
    if (incorrectGuesses <= hangmanFunctions.length) {
      hangmanFunctions[incorrectGuesses - 1](); 
    }

    if (incorrectGuesses === hangmanFunctions.length) {
      alert("Game Over! The word was: " + randomWord);
      startNewGame(); 
    }
  };

  const handleGuess = (guessedLetter) => {
    if (!guessedLetters.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);

      if (isCorrectGuess(randomWord, guessedLetter)) {
        const updatedAnswer = updateAnswer(randomWord, guessedLetters);
        answerSection.innerHTML = updatedAnswer;

        if (!updatedAnswer.includes("-")) {
          alert("Congratulations! You guessed the word!");
          startNewGame(); 
        }
      } else {
        
        incorrectGuesses++;

        
        handleIncorrectGuess(incorrectGuesses, hangmanFunctions, randomWord);
      }
    }
  };

  
  const letters = document.querySelectorAll(".letter");
  letters.forEach((letter) => {
    letter.addEventListener("click", () => {
      
      letter.classList.add("pressed");
      handleGuess(letter.innerText);
    });
  });

  
  document.addEventListener("keydown", (event) => {
    const keyPressed = event.key.toUpperCase();
    if (/^[A-Z]$/.test(keyPressed) && !guessedLetters.includes(keyPressed)) {
      handleGuess(keyPressed);
    }
  });
};


startNewGame();
