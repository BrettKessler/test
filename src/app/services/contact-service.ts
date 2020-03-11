import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
    public url = environment.url;

    httpOptions = {
        headers: new HttpHeaders({})
    };

    constructor(public http: HttpClient) {}

    onSubmitContactForm(value) {
        return this.http.post(this.url + `submit-contact`, value).toPromise();
    }
}