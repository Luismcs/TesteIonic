import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GameListService } from 'src/app/services/game-list.service';
import { Game } from 'src/app/models/game';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterLink,
  ],
  providers: [GameListService],
})
export class LojaPage implements OnInit {
  @ViewChild(IonContent) content?: IonContent;

  games: Array<Game> = [];
  page: number = 1;
  maxPages: number = 0;
  sortBy: string = 'title';
  order: string = 'asc';
  searchTerm: string = '';
  searchGenre: string = '';
  user: any;
  avatar?: string;
  avatarBool: boolean = false;
  firstLetter: string = '';

  private userService = inject(UserService);
  private searchTerms = new Subject<string>();
  private searchGenreTerms = new Subject<string>();

  constructor(
    private gamesListService: GameListService,
    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.gamesListService.getGames().subscribe({
      next: (items: Array<Game>) => {
        console.log(items);
      },
    });

    this.handleRefresh();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.gamesListService.searchGamesByTitle(term))
      )
      .subscribe({
        next: (items: Array<Game>) => {
          this.games = items;
        },
      });

    this.searchGenreTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.gamesListService.searchGamesByGenre(term))
      )
      .subscribe({
        next: (items: Array<Game>) => {
          this.games = items;
        },
      });

    let userId = localStorage.getItem('user_id');

    console.log('User ID from localStorage:', userId);
    if (userId) {
      userId = userId.replace(/"/g, '');
      console.log('Formatted User ID:', userId);
      this.userService.getUserById(userId).subscribe((response) => {
        console.log('Response from API:', response);
        if (response) {
          this.user = response;
          this.avatar = response.avatar;
          if (this.avatar == '') {
            this.avatarBool = true;
            this.firstLetter = this.user.name[0];
          }
          console.log(this.user);
        } else {
          console.error('User not found');
        }
      });
    } else {
      console.error('No user_id in localStorage');
    }
  }

  onClickProfile() {
    this.router.navigate(['profile']);
  }

  loadGames() {
    this.gamesListService.getGamesSorted(this.sortBy, this.order).subscribe({
      next: (items: Array<Game>) => {
        this.games = items;
        console.log(items);
      },
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

  searchGamesByGenre(term: string): void {
    this.searchGenreTerms.next(term);
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
      },
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
      },
    });
  }

  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  goToGameDetails(gameId: number) {
    this.router.navigate(['/detalhes-jogo', gameId.toString()]);
  }
}
