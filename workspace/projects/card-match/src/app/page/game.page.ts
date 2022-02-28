import {Component, OnInit, ViewChild} from "@angular/core";
import {Game, GameService} from "../service/game.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {setupUntildestroy} from "../utils";
import {TimerComponent, TimerComponentEvent} from "../component/timer.component";
import {BoardComponent, BoardComponentEvent} from "../component/board.component";


@UntilDestroy({arrayName: 'subscriptions'})
@Component({
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  @ViewChild('board') board!: BoardComponent;
  @ViewChild('timer') timer!: TimerComponent;

  endGame = false;
  timeout = false;

  game!: Game;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    setupUntildestroy(this);
    this.game = this.gameService.newGame();
  }

  onTimerEvent($event: TimerComponentEvent) {
    switch($event.type) {
      case "timeout": {
        this.board.stopGame();
        this.timeout = true;
      }
    }
  }

  onBoardEvent($event: BoardComponentEvent) {
    switch($event.type) {
      case 'end-game': {
        this.timer.stopTimer();
        this.endGame = true;
        break;
      }
      case 'no-match': {
        this.timer.minus(5);
        break;
      }
    }
  }
}
