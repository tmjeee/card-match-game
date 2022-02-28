import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Card, Game} from "../service/game.service";

export interface BoardComponentEvent {
  type: 'end-game' | 'no-match';
}


@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  exportAs: 'boardComponent',
})
export class BoardComponent {

  _stopGame = false;

  timeout: number | null = null;

  @Input() game!: Game;
  @Output() events: EventEmitter<BoardComponentEvent> = new EventEmitter<BoardComponentEvent>();

  stopGame() {
    this._stopGame = true;
  }

  clickCard(card: Card) {
    if (this._stopGame) {
      console.log('Game terminated');
      return;
    }
    console.log('***** click card', card);
    const result = this.game.flipCard(card);
    console.log('***** result', result);
    if (result === 'no-match') {
      this.events.emit({type: 'no-match'});
    }
    if (result === 'end-game') {
      this.events.emit({type: 'end-game'});
    }
  }
}
