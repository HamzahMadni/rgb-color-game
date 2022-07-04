//=============================
//Helper Functions
//=============================

const pickColour = () => {
    const random = Math.floor(Math.random() * colours.length)
    return colours[random]
}

const generateRandomColour = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

const generateRandomColours = (num) => {
    let output = []
    for (let i = 0; i < num; i++) {
        output.push(generateRandomColour())
    }
    return output
}

const changeColour = (colour) => {
    if (numSquares === 6) {
        squares.forEach((square) => {
            square.style.backgroundColor = colour
        })
    } else {
        for (let i = 0; i < numSquares; i++) {
            squares[i].style.backgroundColor = colour
        }
    } 
}

const reset = () => {
    colours = generateRandomColours(numSquares);
    pickedColour = pickColour()
    resetButton.textContent = "New Colours"
    colourDisplay.textContent = pickedColour
    for (let i = 0; i < squares.length; i++) {
        if (colours[i]) {
            squares[i].style.backgroundColor = colours[i]
        } else [
            squares[i].style.backgroundColor = "black"
        ]
    }
    title.style.backgroundColor = "#2e2e2e"
    messageDisplay.textContent = ""
}

//=============================
//Init Variables
//=============================

//State
let numSquares = 6
let colours = generateRandomColours(numSquares)
let pickedColour = pickColour()

// Select Elements
const squares = document.querySelectorAll(".square")
const colourDisplay = document.getElementById("colourDisplay")
const message = document.getElementById("message")
const title = document.querySelector("h1")
const resetButton = document.getElementById("resetButton")
const modeButtons = document.querySelectorAll(".mode")

//=============================
//Main
//=============================

function main() {
    //Update colourDisplay in title
    colourDisplay.textContent = pickedColour
    //Reset Colours Button
    resetButton.addEventListener("click", reset)
    //Mode Buttons
    modeButtons.forEach((button) => {
        button.addEventListener("click", function() {
            modeButtons[0].classList.remove("selected")
            modeButtons[1].classList.remove("selected")
            this.classList.add("selected")
            if (this.textContent === "Easy") {
                numSquares = 3
            } else {
                numSquares = 6
            }
            reset()
        })
    })
    // Setting up Squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colours[i]
        //Add click listeners
        squares[i].addEventListener("click", function() {
            //Get colour of clicked square
            const clickedColour = this.style.backgroundColor
            //Compare that colour to pickedColour
            if (clickedColour === pickedColour) {
                message.textContent = "Correct!"
                changeColour(pickedColour)
                title.style.backgroundColor = pickedColour
                resetButton.textContent = "Play Again?"
            } else {
                this.style.backgroundColor = "black"
                message.textContent = "Guess Again!"
            }
        })
    }
    
}

main()