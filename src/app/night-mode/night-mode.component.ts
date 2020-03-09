import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-night-mode',
  templateUrl: './night-mode.component.html',
  styleUrls: ['./night-mode.component.scss']
})
export class NightModeComponent implements OnInit {
  @Output() nightModeEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }

  nightMode(value){
    if(value.target.checked === true){
      this.nightModeEvent.emit(true);
    } else {
      this.nightModeEvent.emit(false);
    }
  }

}
