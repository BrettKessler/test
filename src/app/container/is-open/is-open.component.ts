import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-is-open',
  templateUrl: './is-open.component.html',
  styleUrls: ['./is-open.component.scss']
})
export class IsOpenComponent implements OnInit {
 @Input() open: string;
  constructor() { }

  ngOnInit() {
  }

}
