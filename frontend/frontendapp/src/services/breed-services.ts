import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class BreedServices {
    url = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }
    getBreeds(): Observable<any> {
        return this.http.get<HttpResponse<any>>(`${this.url}breeds/`, { observe: 'response'});
    }

    createBreed(breed_name: string, intelligence: number, playfulness: number): Observable<any> {
        return this.http.post<HttpResponse<any>>(`${this.url}breeds/`, { breed_name: breed_name, intelligence: intelligence, playfulness: playfulness }, { observe: 'response'});
    }
}