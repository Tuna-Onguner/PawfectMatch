import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class DonationServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getDonations(): Observable<any> {
        return this.http.get<HttpResponse<any>>(`${this.url}donations/`, { observe: 'response'});
    }
}