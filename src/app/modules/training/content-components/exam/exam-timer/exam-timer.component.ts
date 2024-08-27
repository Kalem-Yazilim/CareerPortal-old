import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-timer',
  templateUrl: './exam-timer.component.html',
  styleUrls: ['./exam-timer.component.scss'],
})
export class ExamTimerComponent {
  @Input() time: number;
  @Output() timeEnd = new EventEmitter<void>();
  minutes: string = '00';
  seconds: string = '00';
  private intervalId: any;
  private subscription: Subscription;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.time > 0) {
        this.time--;
        let minutes = Math.floor(this.time / 60);
        let seconds = this.time % 60;
        this.minutes = this.pad(minutes.toString(), 2);
        this.seconds = this.pad(seconds.toString(), 2);
      } else {
        clearInterval(this.intervalId);
        this.timeEnd.emit();
      }
    }, 1000);
  }

  pad(num: string, size: number): string {
    let s = num;
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
