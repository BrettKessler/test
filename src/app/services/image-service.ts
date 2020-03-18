import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
    public url = environment.url;

    httpOptions = {
        headers: new HttpHeaders({})
    };

    constructor(public http: HttpClient) {}

    onSubmitImage(value) {
        return this.http.post(this.url + `user-upload-image`, value).toPromise();
    }

    onSendAdminImage(value) {
        const val = JSON.stringify(value);
        return this.http.post(this.url + `approved-image`, val);
    }
    
    onGetApprovedImage() {
        return this.http.get(this.url + `approved-image`).toPromise();
    }

    onGetImages() {
        return this.http.get(this.url + `images`).toPromise();
    }

    imageUpload(imageForm: FormData) {
        console.log('image uploading');
        return this.http.post(this.url + `upload`, imageForm);
       }
}