import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  timer: number = 0;
  interval: any;
  running: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer() {
    this.running = true;
    this.interval = setInterval(() => {
      this.timer += 10; // Increment by 10 milliseconds
    }, 10);
  }

  pauseTimer() {
    this.running = false;
    clearInterval(this.interval);
  }

  resetTimer() {
    this.running = false;
    clearInterval(this.interval);
    this.timer = 0;
  }

  formatTime(ms: number): string {
    const hours: string = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes: string = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds: string = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const milliseconds: string = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
