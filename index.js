const startGameButton = document.getElementById("start-game")
const gameOverButton = document.getElementById("game-over")
const landingContainer = document.getElementsByClassName("landing-container")
const mainGameContainer = document.getElementsByClassName("main-game-container")
const gameOverContainer = document.getElementsByClassName("game-over-container")
const outcomeMessage = document.getElementById("outcome-message")
const wordDashes = document.getElementsByClassName("dashes") [0]
const guessesLeft = document.getElementsByClassName("guesses-left-container") [0]

class Characters {
    constructor(name, totalHealth) {
        this.name = name
        this.totalHealth = totalHealth
        this.health = totalHealth
    }
// Returns the character health after they have taken damage
    takeDamage(incomingDamage) {
        this.health = this.health - incomingDamage
        return this.health
    }
// Checks if the characters are still alive
    isAlive() {
        return this.health > 0
    }
}

let gameStep = 1
let word = ""
let currentChoices = 0
//Steps for the cycle of the game
const gamePlayLoop = (pickedLetter) => {
    if(gameStep === 1) {
    // User presses start game button
        word = pickedWord(words)
        generateList()
        generateWord(word)
        if(currentChoices < word.length) {
            currentChoices = Math.ceil(word.length * 1.0)
            guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        }
        
        gameStep += 1
    } else if(gameStep === 2) {
    // User presses a letter button
        checkLetter(pickedLetter)
            // if(checkIfDead(lonk, gamon)) {
            //     gameOver(lonk, gamon)
            //     gameStep += 1
            // }
    } else {
    // User presses play again
        reset()
        gameStep = 1
    }
}

const lonk = new Characters("Lonk", 100)

const gamon = new Characters("Gamon", 150)

const words = ["power", "wisdom", "courage", "triforce", "ocarina", "twilight", "hyrule", "skyward", "korok"]


// Randomizes word that is chosen for the user to guess
const pickedWord = (wordsArray) => {
    const randomIndex = 
    Math.floor(Math.random() * wordsArray.length)
    const returnWord = wordsArray[randomIndex]
    console.log(randomIndex, returnWord)
    return returnWord
}


// Checking the letter the user has selected to see if it is in the word that they are guessing. If the letter guessed is correct, Gamon takes damage, if the letter guessed is wrong, Lonk takes damage. Also shows how guesses the player has left
const checkLetter = (letterChoice) => {
    const currentWord = word.toUpperCase()
    if(currentWord.includes(letterChoice)) {
        const pressedLetter = Array.from(wordDashes.getElementsByClassName(letterChoice.toLowerCase()))
      for(let i=0; i < pressedLetter.length; i++) {
        const replaceDashes = document.createElement("span")
        replaceDashes.innerHTML = letterChoice
        wordDashes.replaceChild(replaceDashes, pressedLetter[i])
        const damageTaken = gamon.totalHealth/currentWord.length
        gamon.takeDamage(damageTaken)
      }
    } else {
        const damageTaken = lonk.totalHealth/Math.ceil(currentWord.length * 1.0)
        lonk.takeDamage(damageTaken)
        guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        currentChoices--
    }
}

// Creating buttons for each letter that interact with game step 2
const generateList = () => {
    const generateLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const letterArray = generateLetter.split("")
    for(i = 0; i < letterArray.length; i++) {
        const alphabetList = document.getElementsByClassName("alphabet-list") [0]
        const letterButton = document.createElement("button")
        letterButton.setAttribute("value", letterArray[i])
        letterButton.innerHTML = letterArray[i]
        letterButton.classList.add("alphabet")
        letterButton.addEventListener("click", (e) => {
            gamePlayLoop(e.target.value)
        })
        alphabetList.appendChild(letterButton)
    }
}
// Creating underscores for each letter in word array
const generateWord = (selectedWord) => { //game step 1
    const wordArray = selectedWord.split("")
    for(i = 0; i < wordArray.length; i++) {
        const generateDashes = document.createElement("span")
        generateDashes.classList.add(wordArray[i])
        generateDashes.innerHTML = "_"
        wordDashes.appendChild(generateDashes)
    }

}

gamePlayLoop()

// Only shows the start screen and hides the other two screens
startGameButton.addEventListener("click", () => {
    landingContainer.classList.add("hide")
    mainGameContainer.classList.remove("hide")
    gameOverContainer.classList.remove("hide")
})

// Only shows game over screen and hides the other two screens
gameOverButton.addEventListener("click", () => {
    gameOverContainer.classList.add("hide")
    landingContainer.classList.remove("hide")
    mainGameContainer.classList.remove("hide")
})

//   // Message that appears on the game over screen, letting you know if you won or not
//   if(!gamon.isAlive() && lonk.isAlive) {
//     outcomeMessage.innerText = "You are victorious!"
// }

// if(gamon.isAlive() && !lonk.isAlive) {
//     outcomeMessage.innerText = "You have been defeated!"
// }