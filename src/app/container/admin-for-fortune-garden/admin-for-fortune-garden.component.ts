import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event-service'

@Component({
  selector: 'app-admin-for-fortune-garden',
  templateUrl: './admin-for-fortune-garden.component.html',
  styleUrls: ['./admin-for-fortune-garden.component.scss']
})
export class AdminForFortuneGardenComponent implements OnInit {
  constructor(private isOpen: EventService) { }

  ngOnInit() {
  }

  onClick(value){
    if (value === 'open') {
      this.isOpen.isOpen(true);
    } else {
      this.isOpen.isOpen(false);
    }
  }

}
