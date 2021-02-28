const yanivButton = document.getElementById("yaniv");
const dropedPile = document.getElementById("dropedPile");
const drawPile = document.getElementById("drawPile");
const board = document.getElementById("board");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");
let gameLoaded = false;

function startNewGameWindow() {
  const startWindow = newElem("div", "startNewGame");
  const numOfPlayers = newElem("select", "numOfPlayers");
  const helloMessage = newElem("div", "helloMessage");
  helloMessage.innerText = "Welcome to Yaniv !\n\n Choose number of players.";
  const option1 = newElem("option", "option");
  const option2 = newElem("option", "option");
  const option3 = newElem("option", "option");
  const startButton = newElem("button", "startButton");
  startButton.innerText = "Start";
  option1.innerText = "2";
  option2.innerText = "3";
  option3.innerText = "4";
  numOfPlayers.append(option1);
  numOfPlayers.append(option2);
  numOfPlayers.append(option3);
  startWindow.append(numOfPlayers);
  startWindow.append(helloMessage);
  startWindow.append(startButton);
  startButton.addEventListener("click", () => {
    let newGame = startNewGame(numOfPlayers.value);
    newGame.CardSplit();
    board.removeChild(startWindow);
    printGame(newGame, numOfPlayers.value);
    gameLoaded = true;
  });
  board.append(startWindow);
}

function startNewGame(num) {
  const game = new Game(num);
  return game;
}

function createCard(cardObj) {
  let url = cardObj.rank + cardObj.suit + ".jpg";
  let card = newElem("img", "card");
  card.src = `./styles/cards/${url}`;
  card.className = `./styles/cards/${url}`;
  return card;
}

function printGame(game, numOfPlayers) {
  for (player of game.players) {
    let playerDiv = document.getElementById(player.name);
    for (card of player.cards) {
      cardImg = createCard(card);
      playerDiv.append(cardImg);
    }
    board.append(playerDiv);
  }
}

function playTurn(nowPlayer) {
  nowPlayer.addEventListener("click", (e) => {
    const cardSrc = e.target.getAttribute("src");
    discardCardDom(nowPlayer, cardSrc);
  });
}

function discardCardDom(player, cardSrc) {
  if (cardSrc) {
    let cardValue = cardSrc;
    cardValue.slice(14, cardSrc.length - 1);
    console.log(cardValue);
    let playerCard = player.getElementsByClassName(cardSrc)[0];
    dropedPile.innerHTML = "";
    dropedPile.append(playerCard);
    player.removeChild(playerCard);
  }
}

document.addEventListener("onload", startNewGameWindow());

playTurn(player1);
