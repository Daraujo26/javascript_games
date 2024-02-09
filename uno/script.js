let gameStarted = false;
let playersTurn = true; // humans first
let playerCards = [];
let computerCards = [];

let remainingCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53]

// card length is 54, I allow 2 duplicates plus the wild cards so the real total is 108

let cards = ["blue-0", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "blue-6", "blue-7", "blue-8", "blue-9", "blue-draw", "blue-rev", "blue-skip", "yellow-0", "yellow-1", "yellow-2", "yellow-3", "yellow-4", "yellow-5", "yellow-6", "yellow-7", "yellow-8", "yellow-9", "yellow-draw", "yellow-rev", "yellow-skip", "green-0", "green-1", "green-2", "green-3", "green-4", "green-5", "green-6", "green-7", "green-8", "green-9", "green-draw", "green-rev", "green-skip", "red-0", "red-1", "red-2", "red-3", "red-4", "red-5", "red-6", "red-7", "red-8", "red-9", "red-draw", "red-rev", "red-skip", "wild-card", "wild-draw"]

let discardPile;


function passCards() {
    gameStarted = true;
    document.getElementById('start-button').style.visibility = 'hidden'

    //
    // randomly pass 7 cards to player & computer
    for (let i=0; i<=6; i++) {
        add(playerCards, getCard())
        add(computerCards, getCard())
    }

    let computerContainer = document.createElement('div')
    computerContainer.id = 'computerDiv'
    computerContainer.classList.add('computer-container')
    document.body.appendChild(computerContainer)

    let playerContainer = document.createElement('div')
    playerContainer.id = 'playerDiv'
    playerContainer.classList.add('player-container')
    document.body.appendChild(playerContainer)

    for (let i=0; i<=6; i++) { // show player cards
        let playerCard = makeCard(playerCards[i])
        playerContainer.appendChild(playerCard)
    }
    for (let i=0; i<=6; i++) { // show computer cards
        let computerCard = document.createElement('button')
        let computerImg = document.createElement('img')
        computerCard.id = `computer-${findIndex(computerCards, computerCards[i])}`
        document.body.appendChild(computerCard)
        computerCard.classList.add('card-button')
        computerImg.classList.add('card')
        computerImg.src = 'images/uno-card.png'
        computerCard.alt = 'img'
        computerCard.appendChild(computerImg)
        computerContainer.appendChild(computerCard)
    }

    // start discard pile
    discardPile = getCard()
    console.log("Starting card: " + cards[discardPile])
    let discardImg = document.createElement('img')
    discardImg.classList.add('discard-card')
    discardImg.src = 'images/' + cards[discardPile] + '.png'
    discardImg.alt = 'img'
    discardImg.id = 'discard-id'
    document.body.appendChild(discardImg)
}

function takeCard() {

    let playerContainer = document.getElementById('playerDiv')

    if (gameStarted && playersTurn) {
        let newCard = getCard()
        add(playerCards, newCard)
        let playerCard = makeCard(newCard)
        playerContainer.appendChild(playerCard)

        playersTurn = false;
        setTimeout(() => {
            computer()
        }, 2000)
    }
}

function add(array, item) {
    return array[array.length] = item;
}

function remove(array, item) {
    return array.splice(array.indexOf(item), 1)
}

function getCard() {
    let randomNum = Math.floor(Math.random() * remainingCards.length) // not inclusive
    randomNum = remainingCards[randomNum]

    if (randomNum === 52) {
        if (countCards(playerCards, computerCards, 4) === 3) {
            remove(remainingCards, randomNum)
        }
    } else if (randomNum === 53) {
        if (countCards(playerCards, computerCards, 5) === 3) {
            remove(remainingCards, randomNum)
        }
    } else {
        if (countCards(playerCards, computerCards, randomNum) === 1) {
            remove(remainingCards, randomNum)
        }
    }
    return randomNum
}

function countCards(array1, array2, num) { // counts how many instances of num are in array1 and 2
    let count = 0;

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] === num) {
            count++
        }
    }
    for (let i = 0; i < array2.length; i++) {
        if (array2[i] === num) {
            count++
        }
    }
    return count;
}

function makeCard(numInCards) {

    let button = document.createElement('button')
    let img = document.createElement('img')
    button.classList.add('card-button')
    button.id = `${findIndex(playerCards, numInCards)}`


    button.onclick = () => {
        if (playersTurn) {

            let playerContainer = document.getElementById('playerDiv');
            let computerContainer = document.getElementById('computerDiv')

            // discard pile info
            let discardCard = discardPile

            let discardColor = cards[discardCard].split('-')[0]
            let discardNum = cards[discardCard].split('-')[1]

            // button info
            let buttonClicked = button.id
            let buttonColor = img.src.split('images/')[1].split('-')[0]
            let buttonNum = img.src.split('images/')[1].split('-')[1].split('.png')[0]

            if (buttonNum !== "draw" && buttonNum !== "rev" && buttonNum !== "skip") {
                if (discardColor === buttonColor && buttonNum !== 'draw' || discardNum === buttonNum && buttonNum !== 'draw') { // default cards (0-9)
                    document.getElementById('discard-id').remove() // removes discard card
                    img.classList.remove('card') //
                    playerContainer.removeChild(button) // remove button from container
                    img.classList.add('discard-card') // set new css
                    remove(playerCards, buttonClicked) // move card from player array
                    img.id = 'discard-id' // set card to new discard card
                    document.body.appendChild(img)
                    discardPile = numInCards
                    playersTurn = false;
                    setTimeout(() => {
                        computer()
                    }, 2000)
                    console.log("Calling computer at line 165")
                }
            }
            if (buttonNum === "draw" && buttonColor !== "wild") { // draw 2 card
                if (discardColor === buttonColor || discardNum === buttonNum) {
                    document.getElementById('discard-id').remove()
                    img.classList.remove('card')
                    // playerContainer.removeChild(button)
                    img.classList.add('discard-card')
                    remove(playerCards, buttonClicked)
                    img.id = 'discard-id'
                    document.body.appendChild(img)
                    discardPile = numInCards
                    playersTurn = false;


                    // draw two
                    for (let i=0; i<=1; i++) {
                        let newCard = getCard()
                        add(computerCards, newCard)

                        let newComputerCard = document.createElement('button')
                        let computerImg = document.createElement('img')
                        newComputerCard.id = `computer-${findIndex(computerCards, computerCards[i])}`
                        document.body.appendChild(newComputerCard)
                        newComputerCard.classList.add('card-button')
                        computerImg.classList.add('card')
                        computerImg.src = 'images/uno-card.png'
                        newComputerCard.alt = 'img'
                        newComputerCard.appendChild(computerImg)
                        computerContainer.appendChild(newComputerCard)
                    }


                    setTimeout(() => {
                        computer()
                    }, 2000)
                    console.log("Calling computer at line 201")

                }
            }
            if (buttonNum === 'card' && buttonColor === 'wild') { // change color card
                discardPile = null;
                document.getElementById('choose-div').style.visibility = 'visible'
                remove(playerCards, buttonClicked)
                playerContainer.removeChild(button)
                playersTurn = false;
            }
            if (buttonNum === 'draw' && buttonColor === 'wild') { // draw 4 card
                discardPile = null;
                document.getElementById('choose-div').style.visibility = 'visible'

                remove(playerCards, buttonClicked)
                playerContainer.removeChild(button)

                // draw four
                for (let i=0; i<=3; i++) {
                    let newCard = getCard()
                    add(computerCards, newCard)

                    let newComputerCard = document.createElement('button')
                    let computerImg = document.createElement('img')
                    newComputerCard.id = `computer-${findIndex(computerCards, computerCards[i])}`
                    document.body.appendChild(newComputerCard)
                    newComputerCard.classList.add('card-button')
                    computerImg.classList.add('card')
                    computerImg.src = 'images/uno-card.png'
                    newComputerCard.alt = 'img'
                    newComputerCard.appendChild(computerImg)
                    computerContainer.appendChild(newComputerCard)
                }
                playersTurn = false;
            }
            if (buttonNum === 'skip' && discardColor === buttonColor || buttonNum === discardNum) { // skip card
                document.getElementById('discard-id').remove()
                img.classList.remove('card')
                // playerContainer.removeChild(button)
                img.classList.add('discard-card')
                remove(playerCards, buttonClicked)
                img.id = 'discard-id'
                document.body.appendChild(img)
                discardPile = numInCards

            }
            if (buttonNum === 'rev' && discardColor === buttonColor || buttonNum === discardNum) { // reverse card
                // since its two player I'm just going to have the player go again
                document.getElementById('discard-id').remove()
                img.classList.remove('card')
                // playerContainer.removeChild(button)
                img.classList.add('discard-card')
                remove(playerCards, buttonClicked)
                img.id = 'discard-id'
                document.body.appendChild(img)
                discardPile = numInCards

            }
            console.log("Player plays: " + cards[numInCards])
        }
    }


    img.classList.add('card')
    img.src = 'images/' + cards[numInCards] + '.png'
    img.alt = 'img'
    button.appendChild(img)
    return button
}

function computer() {

    // Adjust card IDs
    const computerCardElements = document.querySelectorAll('#computerDiv button');
    computerCardElements.forEach((element, index) => {
        element.id = `computer-${index}`;
    });

    playersTurn = false;
    let noCards = 0;

    console.log(computerCards)
    // get computer container
    let computerContainer = document.getElementById('computerDiv')
    let playerContainer = document.getElementById('playerDiv')

    //
    // discard pile info
    let discardCard = discardPile
    let discardCardNum = cards[discardCard].split('-')[1]
    let discardCardColor = cards[discardCard].split('-')[0]

    if (!playersTurn) {
        for (let i = 0; i < computerCards.length; i++) {
            console.log("RUNNING MAIN BLOCK")
            let numInCards = computerCards[i]

            //
            // computer card info
            let computerCard = cards[computerCards[i]]
            let computerCardNum = computerCard.split('-')[1]
            let computerCardColor = computerCard.split('-')[0]

            if (computerCardNum !== "draw" && computerCardNum !== "rev" && computerCardNum !== "skip") {
                if (discardCardColor === computerCardColor && computerCardNum !== 'draw' || discardCardNum === computerCardNum && computerCardNum !== 'draw') { // default cards (0-9)
                    discardPile = numInCards
                    console.log("Computer runs - 0-9 card")
                    remove(computerCards, numInCards) // remove card from computer array

                    document.getElementById('discard-id').remove() // removes discard card

                    computerContainer.removeChild(document.getElementById('computer-'+i))


                    // get computer cards image
                    let newDiscardImg = document.createElement('img')
                    newDiscardImg.classList.add('discard-card')
                    newDiscardImg.src = 'images/' + cards[discardPile] + '.png'
                    newDiscardImg.alt = 'img'
                    newDiscardImg.id = 'discard-id'
                    document.body.appendChild(newDiscardImg)
                    noCards++
                    break
                }
            }
            if (computerCardNum === "draw" && computerCardColor !== "wild") { // draw 2 card
                if (discardCardColor === computerCardColor || discardCardNum === computerCardNum) {
                    console.log("Computer runs - draw 2 card")
                    discardPile = numInCards
                    remove(computerCards, numInCards)
                    document.getElementById('discard-id').remove()
                    computerContainer.removeChild(document.getElementById("computer-" + i))

                    let newDiscardImg = document.createElement('img')
                    newDiscardImg.classList.add('discard-card')
                    newDiscardImg.src = 'images/' + cards[discardPile] + '.png'
                    newDiscardImg.alt = 'img'
                    newDiscardImg.id = 'discard-id'
                    document.body.appendChild(newDiscardImg)

                    // draw 2
                    for (let i = 0; i <= 1; i++) {
                        let newCard = getCard()
                        add(playerCards, newCard)
                        let playerCard = makeCard(newCard)
                        playerContainer.appendChild(playerCard)
                    }
                    noCards++
                    break
                }
            }
            if (computerCardNum === 'card' && computerCardColor === 'wild') { // change color card
                console.log("Computer runs - change color card")
                discardPile = null;
                remove(computerCards, numInCards)

                // computer sets to a random color
                let color = ['red', 'blue', 'yellow', 'green']
                color = color[Math.floor(Math.random() * 4)]

                document.getElementById('computer-choose-color').innerText = "Computer set color too " + color
                document.getElementById('computer-choose-color').style.visibility = 'visible'
                computerContainer.removeChild(document.getElementById("computer-" + i))

                let newDiscardImg = document.createElement('img')
                newDiscardImg.classList.add('discard-card')
                newDiscardImg.src = 'images/' + color + '-0' + '.png'
                newDiscardImg.alt = 'img'
                newDiscardImg.id = 'discard-id'
                document.body.appendChild(newDiscardImg)

                discardPile = findIndex(cards, color + '-0')

                setTimeout(() => {
                    document.getElementById('computer-choose-color').style.visibility = 'hidden'
                }, 4000)

                // computerContainer.removeChild(button)
                noCards++
                break
            }
            if (computerCardNum === 'draw' && computerCardColor === 'wild') { // draw 4 card
                console.log("Computer runs - draw 4 card")
                discardPile = null;
                remove(computerCards, numInCards)
                computerContainer.removeChild(document.getElementById("computer-" + i))

                // computer sets to a random color
                let color = ['red', 'blue', 'yellow', 'green']
                color = color[Math.floor(Math.random() * 4)]

                document.getElementById('computer-choose-color').innerText = "Computer set color too " + color
                document.getElementById('computer-choose-color').style.visibility = 'visible'

                let newDiscardImg = document.createElement('img')
                newDiscardImg.classList.add('discard-card')
                newDiscardImg.src = 'images/' + color + '-0' + '.png'
                newDiscardImg.alt = 'img'
                newDiscardImg.id = 'discard-id'
                document.body.appendChild(newDiscardImg)

                discardPile = findIndex(cards, color + '-0')

                // draw 4
                for (let i = 0; i <= 3; i++) {
                    let newCard = getCard()
                    add(playerCards, newCard)
                    let playerCard = makeCard(newCard)
                    playerContainer.appendChild(playerCard)
                }

                setTimeout(() => {
                    document.getElementById('computer-choose-color').style.visibility = 'hidden'
                }, 4000)
                noCards++
                break
            }
            if (computerCardNum === 'skip' && discardCardColor === computerCardColor || computerCardNum === discardCardNum) { // skip card
                discardPile = numInCards
                remove(computerCards, numInCards)
                console.log("Computer runs - skip card")
                document.getElementById('discard-id').remove()
                computerContainer.removeChild(document.getElementById("computer-" + i))

                let newDiscardImg = document.createElement('img')
                newDiscardImg.classList.add('discard-card')
                newDiscardImg.src = 'images/' + cards[discardPile] + '.png'
                newDiscardImg.alt = 'img'
                newDiscardImg.id = 'discard-id'
                document.body.appendChild(newDiscardImg)

                noCards++
                break
            }
            if (computerCardNum === 'rev' && discardCardColor === computerCardColor || computerCardNum === discardCardNum) { // reverse card

                discardPile = numInCards
                remove(computerCards, numInCards)
                console.log("Computer runs - reverse card")
                document.getElementById('discard-id').remove()
                computerContainer.removeChild(document.getElementById("computer-" + i))

                let newDiscardImg = document.createElement('img')
                newDiscardImg.classList.add('discard-card')
                newDiscardImg.src = 'images/' + cards[discardPile] + '.png'
                newDiscardImg.alt = 'img'
                newDiscardImg.id = 'discard-id'
                document.body.appendChild(newDiscardImg)

                noCards++
                break
            }
        }
        if (noCards === 0) { // draw card
            console.log("Computer runs - draw card")
            let newCard = getCard()
            add(computerCards, newCard)

            let newComputerCard = document.createElement('button')
            let computerImg = document.createElement('img')
            newComputerCard.id = `computer-${findIndex(computerCards, newCard)}`

            newComputerCard.classList.add('card-button')
            computerImg.classList.add('card')
            computerImg.src = 'images/uno-card.png'
            newComputerCard.alt = 'img'
            newComputerCard.appendChild(computerImg)
            computerContainer.appendChild(newComputerCard)
        }
        console.log("Computer play: " + cards[discardPile])
        console.log("Card in pile: " + cards[discardPile])
        playersTurn = true;
    }
}

function findIndex(array, num) {
    let count = 0;
    for (let i=0; i<=array.length; i++) {
        if (array[i] !== num) {
            count++
        } else {
            return count
        }
    }

}

function chooseColor(color) {

    document.getElementById('discard-id').remove() // removes discard card
    discardPile = findIndex(cards, color + '-0')

    let img = document.createElement('img')
    img.classList.add('discard-card')
    img.src = 'images/' + color + '-0' + '.png'
    img.alt = 'img'
    img.id = 'discard-id'
    document.body.appendChild(img)

    document.getElementById('choose-div').style.visibility = 'hidden'

    setTimeout(() => {
        computer()
    }, 2000)
    console.log("Calling computer at line 492")
}