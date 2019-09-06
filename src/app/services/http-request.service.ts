import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) {
  }

  login(data): Observable<any> {
    return this.http.post('/api/login', data);
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }
}
