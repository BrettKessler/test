import { Component, OnInit } from '@angular/core';
import { EventService } from './event-service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  open: any;

  constructor(public isOpen: EventService) { }

  ngOnInit() {
    this.isOpen.getIsOpen().then((data: any) => {
      this.open = data.data;
    });
  }

}
