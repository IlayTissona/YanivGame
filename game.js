const yanivButton = document.getElementById("yaniv");
const dropedPile = document.getElementById("dropedPile");
const drawPile = document.getElementById("drawPile");
const board = document.getElementById("board");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player3 = document.getElementById("player3");
const player4 = document.getElementById("player4");
const piles = document.getElementById("piles");
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
    newGame.CardDeal();
    board.removeChild(startWindow);
    printGame(newGame, numOfPlayers.value);
    gameLoaded = true;
  });
  board.append(startWindow);
}

function startNewGame(numOfPlayers) {
  const game = new Game(numOfPlayers);
  return game;
}

function createCard(cardObj) {
  let url = cardObj.rank + cardObj.suit + ".jpg";
  let card = newElem("img", cardObj.rank + cardObj.suit);
  card.src = `./styles/cards/${url}`;
  card.className = "card";
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
    const cardSuitNRank = e.target.id;
    const cardObj = nowPlayer.stringToCardObj(cardSuitNRank);
    let cardsArr = [];
    if (isLegalChoice(cardsArr, cardObj)) {
      cardsArr.push(cardObj);
    }
  });

  piles.addEventListener("click", (e) => {
    if (e.target.id !== "drawPile" && e.target.id !== "dropedPile") {
      return;
    }
    if (cardsArr.length === 0) {
      return;
    }
    const pileToTakeFrom = e.target.id === "drawPile" ? drawPile : dropedPile;
    //TODO!! check which card of the dropedPile to take - first or last

    if (isLegalPut(cardsArr)) {
      dropedPile.push(...sortCards(cardsArr));
      console.log(cardsArr);
    }
    discardCardDom(nowPlayer, cardSuitNRank);
  });
}

function sortCards(cardsArr) {
  const thereIsAJoker = cardsArr.some((card) => card.isJoker);
  if (!thereIsAJoker) {
    const sortedCards = cardsArr.sort(
      (a, b) => VALUES.indexOf(b.rank) - VALUE.indexOf(a.rank)
    );
    return sortedCards;
  } else {
    const noJokers = cardsArr.filter((card) => !card.isJoker);
    const jokerCards = cardsArr.filter((card) => card.isJoker);
    noJokers.sort((a, b) => VALUES.indexOf(b.rank) - VALUE.indexOf(a.rank));

    for (index in noJokers) {
      if (
        VALUES.indexOf(noJokers[index].rank) -
          VALUES.indexOf(noJokers[index + 1].rank) ===
        jokerCards.length + 1
      ) {
        noJokers.splice(index + 1, 0, ...jokerCards);
      }
    }
    return noJokers;
  }
}

piles.addEventListener("click", (e) => {
  console.log(e.target);
});

function drawFrom(target) {
  return target.id;
}

function discardCardDom(player, cardSuitNRank) {
  if (cardSuitNRank) {
    let playerCard = document.getElementById(cardSuitNRank);
    dropedPile.innerHTML = "";
    player.removeChild(playerCard);
    dropedPile.append(playerCard);
  }
}

//מקבלת מערך של הקלפים שנבחרו, מחזירה טרו אם זה מהלך שחוקי להניח על השולחן
function isLegalPut(cardsArr) {
  //cards - "4H"
  let isAllSameRank = cardsArr.every((card, index, arr) => {
    return (
      card.rank === arr[index + 1].rank || arr[index].isJoker || card.isJoker
    ); //joker is all values
  });

  if (cardsArr.length === 1) {
    return true;
  }

  if (isAllSameRank) {
    return true;
  } else {
    return cardsArr.length >= 3;
  }
}

document.addEventListener("onload", startNewGameWindow());

playTurn(player1);

document.addEventListener("onload", startNewGameWindow());

playTurn(player1);
