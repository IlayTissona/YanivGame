const yanivButton = document.getElementById("yaniv");
const dropedPile = document.getElementById("dropedPile");
const drawPile = document.getElementById("drawPile");
const board = document.getElementById("board");

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
    board.removeChild(startWindow);
    createPlayerDiv(numOfPlayers.value);
  });
  board.append(startWindow);
}

function createPlayerDiv(numOfPlayers) {
  for (let i = 1; i <= numOfPlayers; i++) {
    let player = newElem("div", "player" + i);
    board.append(player);
  }
}

function startNewGAme() {
  const game = new Game();
}

function createCard(place) {
  let card = newElem("div");
}

document.addEventListener("onload", startNewGameWindow());
