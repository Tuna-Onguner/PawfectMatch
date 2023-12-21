import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
  url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    //Print out the username and password to the console
    return this.http.post<any>(`${this.url}login/`, { email: username, password: password });
  }
  logout(): Observable<any> {
    return this.http.post<any>(`${this.url}logout/`, {});
  }
}

