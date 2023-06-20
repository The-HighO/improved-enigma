// Array of words and hints 
const wordList = [
  {
    word: "javascript",
    hint: "A popular programming language used for web development.",
  },
  {
    word: "twitter",
    hint: "A well-known social media platform for  bants.",
  },
  {
    word: "earth",
    hint: "planet of our solar system",
  },
  {
    word: "gold",
    hint: "A precious metal with a yellow color often used in jewelry.",
  },
  {
    word: "jumia",
    hint: "An online shopping site popular in Africa.",
  },
  {
    word: "coding",
    hint: "The process of creating computer programs using programming languages.",
  },
  {
    word: "bugs",
    hint: "Issues or errors in a computer program that aka beans.",
  },
  {
    word: "jola",
    hint: "says: sorry for the laugh",
  },
  {
    word: "ayodeji",
    hint: "Team Intel Manager",
  },
  {
    word: "bolanle",
    hint: "Peper Reina",
  },
  {
    word: "shakur",
    hint: "member of the group",
  },
  {
    word: "abiola",
    hint: "Abibi",
  },
  {
    word: "ibrahim",
    hint: "Team Lead",
  },
  {
    word: "chess",
    hint: "A strategic board game played between two players.",
  },
  {
    word: "github",
    hint: "code hosting platform",
  },
  {
    word: "png",
    hint: "a image file format",
  },
  {
    word: "iphone",
    hint: "A popular smartphone",
  },
  {
    word: "java",
    hint: "A versatile programming language used for various applications.",
  },
  {
    word: "google",
    hint: "famous search engine",
  },
  {
    word: "phillip",
    hint: "facilitator that says: do you understand?",
  },
  {
    word: "sail",
    hint: "a tech facility in ikorodu",
  },
  {
    word: "flute",
    hint: "a musical instrument",
  },
  {
    word: "bitcoin",
    hint: "related to cryptocurrency",
  },
  {
    word: "matthew",
    hint: "sail facilitator",
  },
  {
    word: "john",
    hint: "sail facilitator",
  },
  {
    word: "email",
    hint: "related to exchanging message",
  },
  {
    word: "html",
    hint: "markup language for the web",
  },
  {
    word: "air",
    hint: "The invisible gaseous substance surrounding the Earth.",
  },
  {
    word: "idea",
    hint: "a thought or suggestion",
  },
  {
    word: "server",
    hint: "related to computer or system",
  },
  {
    word: "jpeg",
    hint: "a image file format",
  },
  {
    word: "search",
    hint: "act to find something",
  },
  {
    word: "nigeria",
    hint: "Agbado country",
  },
  {
    word: "naija",
    hint: "developed country name",
  },
  {
    word: "photo",
    hint: "representation of person or scene",
  },
  {
    word: "tinubu",
    hint: "balablue",
  },
];


// Selecting elements from the DOM
const inputs = document.querySelector(".inputs")
const hintTag = document.querySelector(".hint span")
const guessLeft = document.querySelector(".guess-left span")
const wrongLetter = document.querySelector(".wrong-letter span")
const resetBtn = document.querySelector(".reset-btn")
const typingInput = document.querySelector(".typing-input");


// Declare variables
let word = ''
let maxGuesses = ''
let incorrectLetters = []
let correctLetters = [];


// Function to choose a random word and initialize the game
const randomWord = () => {

  // Choose a random word from the wordList array
  let randomCharacter = wordList[Math.floor(Math.random() * wordList.length)];

  // Set the word and maxGuesses variables
  word = randomCharacter.word;
  maxGuesses = word.length >= 5 ? 8 : 6;

  // Reset correctLetters and incorrectLetters arrays
  correctLetters = [];
  incorrectLetters = [];

  // Set the hint, guessLeft, and wrongLetter elements
  hintTag.innerText = randomCharacter.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  // Creating dynamic input elements for each letter of the word
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}


// Call randomWord function to initialize the game
randomWord();

// Function to handle player input and update the game state
const initGame = (e) => {

  // Get the lowercase value from the player's input
  let key = e.target.value.toLowerCase();

  // Check if the input is a letter, not in incorrectLetters or correctLetters
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {

      // The input is a correct letter
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    }
     else {
      // The input is an incorrect letter
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }

     // Update guessLeft and wrongLetter elements
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }

  // Clear the input field
  typingInput.value = "";
 
   // Check game end conditions after a short delay
  setTimeout(() => {
    if (correctLetters.length === word.length) {

      // All letters guessed correctly, show congrats message and start a new game
      alert(`Congrats!You got the word correct: ${word.toUpperCase()}`);
      return randomWord();
    } 
    else if (maxGuesses < 1) {

      // Out of guesses, show game over message and reveal the word
      alert("Game over! You don lose!");

      // Assign each character of the 'word' string to the corresponding input element
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}


// Event listeners for game actions
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
