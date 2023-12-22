import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AdoptionApplicationServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getApplications(): Observable<any> {
        const token = localStorage.getItem('token');
        console.log("Trying to get the adoption applications")
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<HttpResponse<any>>(`${this.url}adoptions/`, { headers, observe: 'response'});
    }

    updateApplicationStatus(application: any): Observable<any> {
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.put<HttpResponse<any>>(`${this.url}adoptions/${application.ao_id}/`, application, { headers, observe: 'response'});
    }
    
}