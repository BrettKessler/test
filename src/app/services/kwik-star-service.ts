import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class KwikStarService {
    public url = environment.url;

    httpOptions = {
        headers: new HttpHeaders({})
    };


    constructor(public http: HttpClient) {}

    onGetDailyDeals(currentDate) {
        const date = {
            date: currentDate
        }
        return this.http.get(this.url + `daily-deals`, {params: date}).toPromise();
    }
}