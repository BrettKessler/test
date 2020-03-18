import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SuppliesService {
    public url = environment.url;

    httpOptions = {
        headers: new HttpHeaders({})
    };

    constructor(public http: HttpClient) {}

    onSubmitSupplies(value) {
        console.log(value);
        return this.http.post(this.url + `submit-supplies`, value);
    }

    onGetSupplyLists(){
        return this.http.get(this.url + `get-supplies`);
    }

    onPickupSupplies(value) {
        console.log(value);
        return this.http.post(this.url + `pickup-supplies`, value);
    }

}