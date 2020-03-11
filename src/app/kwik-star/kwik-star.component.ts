import { Component, OnInit } from '@angular/core';
import { KwikStarService } from '../services/kwik-star-service';
import * as moment from 'moment';

@Component({
  selector: 'app-kwik-star',
  templateUrl: './kwik-star.component.html',
  styleUrls: ['./kwik-star.component.scss']
})
export class KwikStarComponent implements OnInit {
  currentDate = moment().format();
  products;
  constructor( public kwik: KwikStarService) { }

  ngOnInit() {
    this.kwik.onGetDailyDeals(this.currentDate).then((data: any) => {
      this.products = data.data;
    })
  }

}
