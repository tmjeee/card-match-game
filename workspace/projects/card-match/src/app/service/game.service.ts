import {Injectable} from "@angular/core";

export type Type = '1' | '2' | '3' | '4' | '5' | '6' |'7' | '8' | '9' | '10' | 'K' | 'Q' | 'J' | 'A';
export type Kind = 'Spade' | 'Diamond' | 'Club' | 'Heart'

const backImage = '/assets/back.png';

export class Card {
  showFace = false;
  constructor(public id: number, public image: string, public type: Type, public kind: Kind) {
  }

  get cardImage() {
    return this.showFace  ? this.image : backImage;
  }

  isSame(card: Card): boolean {
    return (card.type === this.type) && (card.kind === this.kind);
  }
}

const ALL_CARDS = [
  new Card(1, '/assets/2_of_clubs.png', '2', 'Club'),
  new Card(2, '/assets/2_of_diamonds.png', '2', 'Diamond'),
  new Card(3, '/assets/2_of_hearts.png', '2', 'Heart'),
  new Card(4, '/assets/2_of_spades.png', '2', 'Spade'),
  new Card(5, '/assets/10_of_clubs.png', '10', 'Club'),
  new Card(6, '/assets/10_of_diamonds.png', '10', 'Diamond'),
  new Card(7, '/assets/10_of_hearts.png', '10', 'Heart'),
  new Card(8, '/assets/10_of_spades.png', '10', 'Spade'),

  new Card(9, '/assets/2_of_clubs.png', '2', 'Club'),
  new Card(10, '/assets/2_of_diamonds.png', '2', 'Diamond'),
  new Card(11,'/assets/2_of_hearts.png', '2', 'Heart'),
  new Card(12,'/assets/2_of_spades.png', '2', 'Spade'),
  new Card(13,'/assets/10_of_clubs.png', '10', 'Club'),
  new Card(14,'/assets/10_of_diamonds.png', '10', 'Diamond'),
  new Card(15,'/assets/10_of_hearts.png', '10', 'Heart'),
  new Card(16,'/assets/10_of_spades.png', '10', 'Spade'),
]


export type GameState = 'start' | 'flip-another-card' | 'match' | 'no-match' | 'wait' | 'end-game';

export class Game {

  gameState: GameState = 'start';

  cards = [...ALL_CARDS];

  flippedCard1: Card | null = null;
  flippedCard2: Card | null = null;

  matchedCardsCount = 0;

  constructor() {
  }

  shuffle() {
    let currentIndex = this.cards.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
    }
  }

  flipCard(card: Card): GameState {
    if (!card.showFace) {
      if (this.gameState == 'start' || this.gameState == 'no-match' || this.gameState == 'match') {
        this.flippedCard1 = card;
        this.flippedCard1.showFace = true;
        this.gameState = 'flip-another-card';
        return this.gameState;
      } else if (this.gameState == 'flip-another-card') {
        this.flippedCard2 = card;
        this.flippedCard2.showFace = true;
        const match = this.matchCards(this.flippedCard1!, this.flippedCard2);
        if (match) {
          this.flippedCard1 = null;
          this.flippedCard2 = null;
          this.matchedCardsCount += 2;
          if (this.matchedCardsCount === this.cards.length) {
            this.gameState = 'end-game';
            return this.gameState;
          }
          this.gameState = 'match';
          return this.gameState;
        } else {
          setTimeout(()=> {
            this.flippedCard1!.showFace = false;
            this.flippedCard2!.showFace = false;
            this.flippedCard1 = null;
            this.flippedCard2 = null;
            this.gameState = 'no-match';
          }, 1000);
          this.gameState = 'wait';
          return this.gameState;
        }
      }
    }
    return this.gameState;
  }

  matchCards(card1: Card, card2: Card): boolean {
    if (card1.isSame(card2)) {
      return true;
    }
    return false;
  }
}




@Injectable()
export class GameService {

  newGame(): Game {
    const game = new Game();
    game.shuffle();
    return game;
  }


}
