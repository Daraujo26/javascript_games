let playerWinCount = 0;
let computerWinCount = 0;
let isInitialRoll = true;

function rollDice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setImage(num) {
    if (num === 1) {
        return "images/dice-one.png"
    } else if (num === 2) {
        return "images/dice-two.png"
    } else if (num === 3) {
        return "images/dice-three.png"
    } else if (num === 4) {
        return "images/dice-four.png"
    } else if (num === 5) {
        return "images/dice-five.png"
    } else {
        return "images/dice-six.png"
    }
}

function initialGame(roll) {

    let calcnum = document.getElementById('calc-num');
    calcnum.textContent = roll;

    let winMessage = document.getElementById('win-message')

    if (isInitialRoll) {
        if (roll === 7 || roll === 11) {
            playerWinCount += 1;
            winMessage.style.color = 'green'
            winMessage.style.visibility = 'visible'
            winMessage.textContent = "Player win!"
        } else if (roll === 2 || roll === 3 || roll === 11) {
            computerWinCount += 1;
            winMessage.style.color = 'red'
            winMessage.style.visibility = 'visible'
            winMessage.textContent = "Computer win ;("
        } else {
            point = roll
            isInitialRoll = false;
            document.getElementById('header').textContent = `Your Point - ${(point)}`
            document.getElementById('main-button').textContent = `Roll to hit your "Point"`
        }
    } else {
        if (roll === point) {
            playerWinCount += 1;
            isInitialRoll = true;

            winMessage.style.color = 'green'
            winMessage.style.visibility = 'visible'
            winMessage.textContent = "Player win!"
            document.getElementById('header').textContent = "Current Roll"
            document.getElementById('main-button').textContent = "Roll Dice"
        } else if (roll === 7) {
            computerWinCount += 1;
            isInitialRoll = true;

            winMessage.style.color = 'red'
            winMessage.style.visibility = 'visible'
            winMessage.textContent = "Computer win ;("
            document.getElementById('header').textContent = "Current Roll"
            document.getElementById('main-button').textContent = "Roll Dice"
        }

    }
}

function game() {

    document.getElementById('win-message').style.visibility = 'hidden'

    //
    // choose a random number 1-6 for each dice
    let num1 = rollDice(1, 6)
    let num2 = rollDice(1, 6);

    //
    // calculate total
    let roll = num1 + num2;
    console.log(num1 + "--" + num2)

    //
    // change images
    let img1 = document.getElementById('first-dice')
    let img2 = document.getElementById('second-dice')

    img1.src = setImage(num1);
    img2.src = setImage(num2);

    initialGame(roll);

    document.getElementById('player-score').textContent = `Player: ${playerWinCount}`;
    document.getElementById('computer-score').textContent = `Computer: ${computerWinCount}`;
    
}

