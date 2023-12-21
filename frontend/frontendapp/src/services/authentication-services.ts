import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
  url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    //Print out the username and password to the console
    return this.http.post<HttpResponse<any>>(`${this.url}login/`, { email: username, password: password }, { observe: 'response'});
  }
  logout(): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.url}logout/`, {},{ observe: 'response'});
  }

  adopterRegister(username: string, password: string, email: string, phone: string): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.url}adopters/`, { user_name: username, password: password, email: email, phone_number: phone }, { observe: 'response'});
  }

  otherRegister(username: string, password: string, email: string, phone: string, street: string, city: string, country: string, state: string, is_vet: boolean): Observable<any> {
    if (is_vet) {
      return this.http.post<HttpResponse<any>>(`${this.url}veterinarians/`, { user_name: username, password: password, email: email, phone_number: phone, vet_street: street, vet_city: city, vet_country: country, vet_state: state }, { observe: 'response'});
    }
    console.log("not vet")
    return this.http.post<HttpResponse<any>>(`${this.url}adoption-organizations/`, { user_name: username, password: password, email: email, phone_number: phone, ao_street: street, ao_city: city, ao_country: country, ao_state: state }, { observe: 'response'});
  }
}

