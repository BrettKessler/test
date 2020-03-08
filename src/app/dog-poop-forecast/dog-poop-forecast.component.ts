import { Component, OnInit } from '@angular/core';
import { EventService } from '../container/event-service';

@Component({
  selector: 'app-dog-poop-forecast',
  templateUrl: './dog-poop-forecast.component.html',
  styleUrls: ['./dog-poop-forecast.component.scss']
})
export class DogPoopForecastComponent implements OnInit {
  weather: any;
  constructor(public service: EventService) { }

  ngOnInit() {
    this.service.getWeather().then((data: any) => {
      this.weather = data.data.currently;
    })
  }

}
