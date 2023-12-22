import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class PetServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getPets(): Observable<any> {
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<HttpResponse<any>>(`${this.url}pets/`, { headers, observe: 'response'});
    }

    getOwnedPets(): Observable<any> {
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<HttpResponse<any>>(`${this.url}pets_owned/`, { headers, observe: 'response'});
    }   

    deletePets(petId: number): Observable<any> {
        const token = localStorage.getItem('token');
        //How to check if the token is null?
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.delete<HttpResponse<any>>(`${this.url}pets/${petId}/`, { headers, observe: 'response'});
    }
}