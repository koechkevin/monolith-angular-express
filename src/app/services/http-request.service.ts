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

  register(data): Observable<any> {
    return this.http.post('/api/register', data);
  }

  getProfileData(): Observable<any> {
    return this.http.get('/api/profile');
  }

  updateProfile(data: object): Observable<any> {
    return this.http.post('/api/profile', data);
  }

  loggedIn(): Observable<boolean> {
    return new Observable(subscriber => {
      const interval = setInterval(() => {
        const isLoggedIn = !!localStorage.getItem('token');
        subscriber.next(isLoggedIn);
        }, 1000);
      return () => clearInterval(interval);
    });
  }
}
