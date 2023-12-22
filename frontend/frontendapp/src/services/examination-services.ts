import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class ExaminationServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getExaminations(): Observable<any> {
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<HttpResponse<any>>(`${this.url}examinations/`, { headers, observe: 'response'});
    }
}