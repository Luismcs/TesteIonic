import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.baseUrl}/users`);
  }

  getUserById(userId: string): Observable<any | undefined> {
    return this.getUsers().pipe(
      map((users) => {
        console.log('Users from API:', users);
        const user = users.find((user) => user.id === userId);
        console.log('Found user:', user);
        return user;
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.getUserById(userId).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          return this.http.put(`${this.baseUrl}/users/${existingUser.id}`, user);
        } else {
          return new Observable<any>((observer) => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.getUserById(userId).pipe(
      switchMap((existingUser) => {
        if (existingUser) {
          return this.http.delete(`${this.baseUrl}/users/${existingUser.id}`);
        } else {
          return new Observable<any>((observer) => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }
}
