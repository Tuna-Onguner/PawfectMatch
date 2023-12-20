import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
  url = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}login/`, { username, password });
  }
  logout(): Observable<any> {
    return this.http.post<any>(`${this.url}logout/`, {});
  }
}

