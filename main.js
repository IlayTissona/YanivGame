const SUITS = ["♥", "♦", "♠", "♣"];
const VAlUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
    this.cards.push(new Card("red", "JOKER"));
    this.cards.push(new Card("black", "JOKER"));
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.cardSum;
    this.yanivAble = () => {
      if (this.cardSum <= 7) return true;
      return false;
    };
    this.score = 0;
    this.stillPlaying = () => {
      if (score < 200) return false;
      return true;
    };
  }

  get cardSum() {
    let sum = 0;
    for (let card of this.cards) {
      if (isNaN(card.value)) {
        switch (card.value) {
          case "K": {
            sum += 10;
            break;
          }
          case "JOKER": {
            break;
          }
          case "J": {
            sum += 10;
            break;
          }
          case "Q": {
            sum += 10;
            break;
          }
          case "A":
            sum += 1;
            break;
        }
      } else {
        sum += Number(card.value);
      }
    }
    return sum;
  }
}

class Game {
  constructor() {
    this.drawingDeck = new Deck().cards;
    this.players = createPlayers();
    this.dropedCards = [];
    this.round = 0;
    this.starter = this.players[Math.floor(Math.random() * 5)];
  }

  CardSplit() {
    for (let i = 0; i < 5; i++) {
      for (let player of this.players) {
        player.cards.push(this.drawingDeck.pop());
      }
    }
  }
}

function createPlayers() {
  let p = [];
  for (let i = 0; i < 5; i++) {
    p.push(new Player("player" + i));
  }
  return p;
}

function foundWinner() {
  let winner = players[0];
  for (let player of players) {
    if (player.cardSum < winner.cardSum) winner = player;
  }
  return winner;
}

function newElem(type, className) {
  let elem = document.createElement(type);
  if (className) elem.className = className;
  return elem;
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VAlUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

const cards = new Deck();
cards.shuffle();
const game = new Game();
game.CardSplit();
// console.log(game.players[0].cards);
// console.log(game.players[0].cardSum);
