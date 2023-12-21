import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class DonationServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getDonations(): Observable<any> {
        //Send the JWT token in the 'Authorization' header
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<HttpResponse<any>>(`${this.url}donations/`, {headers, observe: 'response' });
    }
}