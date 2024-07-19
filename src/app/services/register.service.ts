import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.checkEmailExists(user.email).pipe(
      switchMap(emailExists => {
        if (emailExists) {
          return throwError(() => new Error('Email já está registrado'));
        }
        return this.http.post(`${this.baseUrl}/users`, user).pipe(
          catchError(this.handleError)
        );
      }),
      catchError(this.handleError)
    );
  }

  private checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map(users => users.length > 0),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
