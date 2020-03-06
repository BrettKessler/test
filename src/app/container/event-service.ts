import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
      public open: Subject<boolean> = new Subject<boolean>()

    constructor() { }

    isOpen(value) {
        if (value === true) {
            this.open.next(true)
        } else {
            this.open.next(false)
        }
    }
}