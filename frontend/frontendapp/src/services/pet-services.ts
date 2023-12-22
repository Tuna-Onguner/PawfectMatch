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

    createPet(pet_name: string, pet_type: string, pet_size: string, pet_color: string, pet_breed: number, pet_image?: File): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.post<HttpResponse<any>>(`${this.url}pets/`, { pet_name: pet_name, pet_type: pet_type, pet_size: pet_size, pet_color: pet_color, breed_id: pet_breed, pet_image: pet_image }, { headers, observe: 'response'});
    }

    adoptPet(adopter_id: number, pet_id: number, aapp_file?: File): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        const aapp_date = new Date().toISOString();
        return this.http.post<HttpResponse<any>>(`${this.url}adoptions/`, { adopter_id: adopter_id, aapp_date, pet_id: pet_id, aapp_file: aapp_file}, { headers, observe: 'response'});
    }
}