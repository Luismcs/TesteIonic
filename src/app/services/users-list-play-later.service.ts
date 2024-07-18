import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamePlayLater } from '../models/game-play-later';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersListPlayLaterService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*Listas PlayLater*/ 
  getPlayLater(): Observable<Array<GamePlayLater>> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListPlayLater`);
  }

  getPlayLaterByUserId(userId: string): Observable<GamePlayLater | undefined> {
    return this.http.get<Array<GamePlayLater>>(`${this.baseUrl}/usersListPlayLater?userId=${userId}`)
      .pipe(map(lists => lists.length > 0 ? lists[0] : undefined));
  }

  addGameToPlayLater(userId: string, gameId: number): Observable<any> {
    return this.getPlayLaterByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          // Atualiza a lista de jogos existente
          userList.games.push({ gameId, createDate: new Date().toISOString() });
          return this.http.put(`${this.baseUrl}/usersListPlayLater/${userList.id}`, userList);
        } else {
          // Cria uma nova entrada para o usuário
          return this.http.post(`${this.baseUrl}/usersListPlayLater`, { userId, games: [{ gameId, createDate: new Date().toISOString() }] });
        }
      })
    );
  }

  removeGameFromPlayLater(userId: string, gameId: number): Observable<any> {
    return this.getPlayLaterByUserId(userId).pipe(
      switchMap(userList => {
        if (userList) {
          userList.games = userList.games.filter(game => game.gameId !== gameId);
          if (userList.games.length > 0) {
            // Atualiza a lista de jogos existente
            return this.http.put(`${this.baseUrl}/usersListPlayLater/${userList.id}`, userList);
          } else {
            // Remove a entrada do usuário se a lista de jogos estiver vazia
            return this.http.delete(`${this.baseUrl}/usersListPlayLater/${userList.id}`);
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

