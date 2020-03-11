import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event-service'
import { ImageService } from '../../services/image-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-for-fortune-garden',
  templateUrl: './admin-for-fortune-garden.component.html',
  styleUrls: ['./admin-for-fortune-garden.component.scss']
})
export class AdminForFortuneGardenComponent implements OnInit {
  public url = environment.url;
  images;

  constructor(private isOpen: EventService, public getImages: ImageService) { }

  ngOnInit() {
    this.getImages.onGetImages().then((data: any) => {
      this.images = data.data[data.data.length - 1];

    })
  }

  onClick(value){
    this.isOpen.setStatus(value);
  }

  onSendImage(value) {
    const data = {
      imgAddress: value
    }
    this.getImages.onSendAdminImage(data).subscribe(res => {
      console.log(res);
    })
  }
}
