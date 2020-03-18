import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image-service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  image: string;
  imageObj: File;
  imageUrl: string;
  selectedFile: File = null;
  warningLabel: boolean = false;
  successLabel: boolean = false;

  constructor( public imageUpload: ImageService) { }

  ngOnInit() {
    this.imageUpload.onGetApprovedImage().then((data: any) => {
      console.log(data.data);
      this.image = data.data[0].approvedImage;
    })
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
   }

   onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUpload.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res['image'];
    });
   }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if(this.warningLabel === true){
      this.warningLabel = false;
    }
  }

  onUpload() {
    const fd = new FormData();
    if(this.selectedFile.type != 'image/png' && this.selectedFile.type != 'image/jpeg' && this.selectedFile.type != 'image/jpg') {
      this.warningLabel = true;
      this.setMessage();
    }
    if(this.selectedFile.type === 'image/png' || 'image/jpeg' || 'image/jpg') {
      this.successLabel = true;
      fd.append('image', this.selectedFile, this.selectedFile.name)
      this.setMessage();
      this.imageUpload.onSubmitImage(fd).then(data => {});
    }
  }

  setMessage(){
    setTimeout(() => {
      this.successLabel = false;
      this.warningLabel = false;
    }, 5000)
  }
}
