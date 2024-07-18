import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GameListService } from 'src/app/services/game-list.service';
import { Game } from 'src/app/models/game';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  providers: [GameListService]
})
export class LojaPage implements OnInit {
  @ViewChild(IonContent) content?: IonContent;

  games: Array<Game> = [];
  page: number = 1;
  maxPages: number = 0;
  sortBy: string = 'title'; 
  order: string = 'asc';
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(private gamesListService: GameListService, private router: Router) { }

  ngOnInit() {
    this.gamesListService.getGames().subscribe({
      next: (items: Array<Game>) => {
        console.log(items);
      }
    });

    this.handleRefresh();

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.gamesListService.searchGamesByTitle(term))
    ).subscribe({
      next: (items: Array<Game>) => {
        this.games = items;
      }
    });
  }

  loadGames() {
    this.gamesListService.getGamesSorted(this.sortBy, this.order).subscribe({
      next: (items: Array<Game>) => {
        this.games = items;
        console.log(items);
      }
    });
  }

  sortGamesByTitle() {
    this.sortBy = 'title';
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.loadGames();
  }

  sortGamesByReleaseDate() {
    this.sortBy = 'release_date';
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.loadGames();
  }

  searchGamesByTitle(term: string): void {
    this.searchTerms.next(term);
  }

  onIonInfinite(event: any): void {
    if (this.page >= this.maxPages) {
      event.target.complete();
      return;
    }

    this.gamesListService.getGamesPaginate(++this.page, 3).subscribe({
      next: (games: any) => {
        this.games.push(...games.data);
        event.target.complete();
      }
    });
  }

  handleRefresh(event?: any) {
    this.page = 1;
    this.gamesListService.getGamesPaginate(1, 3).subscribe({
      next: (games: any) => {
        this.maxPages = games.pages;
        this.games = games.data;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  goToGameDetails(gameId: number) {
    this.router.navigate(['/detalhes-jogo', gameId.toString()]);
  }
}
