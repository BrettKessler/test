import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-fireworks',
  templateUrl: './fireworks.component.html',
  styleUrls: ['./fireworks.component.scss']
})
export class FireworksComponent implements OnInit, OnDestroy {
  public days;
  public hours;
  public minutes;
  public seconds;
  public distance;
  public now;
  public x;
  public time;
  constructor() { }

  ngOnInit() {
  this.time = new Date("July 4, 2020 00:00:00").getTime();
  this.x = setInterval(() => {
    this.now = new Date().getTime();

    this.distance = this.time - this.now;

    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

  }, 1000);
  }

  ngOnDestroy() {
    if (this.distance < 0) {
      clearInterval(this.x);
    }
  }
}
