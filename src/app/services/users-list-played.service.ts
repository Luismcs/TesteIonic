import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GamePlayLater } from '../models/game-play-later';

@Injectable({
  providedIn: 'root'
})
export class UsersListPlayedService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /* Listas Played */
  getPlayed(): Observable<Array<GamePlayLater>> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListPlayed`);
  }

  getPlayedByUserId(userId: string): Observable<GamePlayLater | undefined> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListPlayed?userId=${userId}`)
      .pipe(map(lists => lists.length > 0 ? lists[0] : undefined));
  }

  addGameToPlayed(userId: string, gameId: number): Observable<any> {
    return this.getPlayedByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          // Atualiza a lista de jogos existente
          userList.games.push({ gameId, createDate: new Date().toISOString() });
          return this.http.put(`${this.baseUrl}/usersListPlayed/${userList.id}`, userList);
        } else {
          // Cria uma nova entrada para o usuário
          return this.http.post(`${this.baseUrl}/usersListPlayed`, { userId, games: [{ gameId, createDate: new Date().toISOString() }] });
        }
      })
    );
  }

  removeGameFromPlayed(userId: string, gameId: number): Observable<any> {
    return this.getPlayedByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          userList.games = userList.games.filter(game => game.gameId !== gameId);
          if (userList.games.length > 0) {
            // Atualiza a lista de jogos existente
            return this.http.put(`${this.baseUrl}/usersListPlayed/${userList.id}`, userList);
          } else {
            // Remove a entrada do usuário se a lista de jogos estiver vazia
            return this.http.delete(`${this.baseUrl}/usersListPlayed/${userList.id}`);
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
