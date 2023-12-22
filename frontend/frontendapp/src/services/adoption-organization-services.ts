import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AdoptionOrganizationServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getOrganizations(): Observable<any> {
        return this.http.get<HttpResponse<any>>(`${this.url}adoption-organizations/`, { observe: 'response'});
    }
}