import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GamePlayLater } from '../models/game-play-later';

@Injectable({
  providedIn: 'root'
})
export class UsersListCompletedService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /* Listas Completed */
  getCompleted(): Observable<Array<GamePlayLater>> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListCompleted`);
  }

  getCompletedByUserId(userId: string): Observable<GamePlayLater | undefined> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListCompleted?userId=${userId}`)
      .pipe(map(lists => lists.length > 0 ? lists[0] : undefined));
  }

  addGameToCompleted(userId: string, gameId: number): Observable<any> {
    return this.getCompletedByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          // Atualiza a lista de jogos existente
          userList.games.push({ gameId, createDate: new Date().toISOString() });
          return this.http.put(`${this.baseUrl}/usersListCompleted/${userList.id}`, userList);
        } else {
          // Cria uma nova entrada para o usuário
          return this.http.post(`${this.baseUrl}/usersListCompleted`, { userId, games: [{ gameId, createDate: new Date().toISOString() }] });
        }
      })
    );
  }

  removeGameFromCompleted(userId: string, gameId: number): Observable<any> {
    return this.getCompletedByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          userList.games = userList.games.filter(game => game.gameId !== gameId);
          if (userList.games.length > 0) {
            // Atualiza a lista de jogos existente
            return this.http.put(`${this.baseUrl}/usersListCompleted/${userList.id}`, userList);
          } else {
            // Remove a entrada do usuário se a lista de jogos estiver vazia
            return this.http.delete(`${this.baseUrl}/usersListCompleted/${userList.id}`);
          }
        } else {
          return new Observable<any>(observer => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }
  
}
