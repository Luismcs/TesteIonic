import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { GameDetails } from 'src/app/models/game-details';

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(
      `http://localhost:3000/gamesList`
    );
  }

  getGamesPaginate(page: number, perPage: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/gamesList?_page=${page}&_per_page=${perPage}`
    );
  }

  getGameById(gameId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/products/${gameId}`);
  }

  getGamesSorted(sortBy: string, order: string): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(
      `http://localhost:3000/gamesList?_sort=${sortBy}&_order=${order}`
    );
  }

  searchGamesByTitle(title: string): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(
      `http://localhost:3000/gamesList`
    ).pipe(
      map(games => 
        games.filter(game => 
          game.title.toLowerCase().includes(title.toLowerCase())
        )
      )
    );
  }

  /*DETALHES DO JOGO*/
  getGameDetails(id: string): Observable<GameDetails[]> {
    return this.http.get<GameDetails[]>(`http://localhost:3000/gameDetails?id=${id}`);
  }

  
   
}
