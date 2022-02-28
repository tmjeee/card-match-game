import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

export interface TimerComponentEvent {
  type: 'timeout';
}

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  exportAs: 'timerComponent'
})
export class TimerComponent implements OnInit {

  @Input() timeout: number = 50;
  @Output() events: EventEmitter<TimerComponentEvent> = new EventEmitter<TimerComponentEvent>();

  time: number = 50;

  intervalHandler!: number;

  ngOnInit(): void {
    this.time = this.timeout;
    this.intervalHandler = setInterval(()=> {
      this.time = this.time - 1;
      if (this.time === 0) {
        this.declareTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    this.intervalHandler && clearInterval(this.intervalHandler);
  }

  minus(time: number) {
    this.time = this.time - time;
    if (this.time < 0) {
      this.time = 0;
      this.declareTimeout();
    }
  }

  private declareTimeout() {
    clearInterval(this.intervalHandler);
    this.events.emit({type: 'timeout'});
  }



}
