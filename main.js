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
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = this.rank === "JOKER";
  }
}

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
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
    this.cards = new PlayerDeck().cards;
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
      if (isNaN(card.rank)) {
        switch (card.rank) {
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
        sum += Number(card.rank);
      }
    }
    return sum;
  }

  discardCard(cardPlace, pileDeck) {
    pileDeck.push(this.cards[cardPlace]);
    this.cards.splice(cardPlace, 1);
  }

  drawCard(drawingDeck) {
    this.cards.push(drawingDeck.pop());
  }
}

class TableDeck extends Deck {
  constructor(cards = freshDeck()) {
    super(cards);
    this.cards.push(new Card("red", "JOKER"));
    this.cards.push(new Card("black", "JOKER"));
  }
}

class PlayerDeck extends Deck {
  constructor(cards = []) {
    super(cards);
  }
}

class PileDeck extends Deck {
  constructor(cards = []) {
    super(cards);
  }
}

class Game {
  constructor(playersNum) {
    this.drawingDeck = new TableDeck().cards;
    this.players = createPlayers(playersNum);
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

  winnerFounder() {
    const winner = this.players[0];
    for (player of this.players) {
      if (winner.cardSum > player.cardSum) winner = player;
    }
    return winner;
  }
}

function createPlayers(playersNum) {
  let p = [];
  for (let i = 0; i < playersNum; i++) {
    p.push(new Player("player" + i));
  }
  return p;
}

function newElem(type, className) {
  let elem = document.createElement(type);
  if (className) elem.className = className;
  return elem;
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VAlUES.map((rank) => {
      return new Card(suit, rank);
    });
  });
}

const cards = new TableDeck();
cards.shuffle();
const game = new Game(3);
// console.log(cards);
// console.log(game);
