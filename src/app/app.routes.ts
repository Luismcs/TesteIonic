import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'loja',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/loja/loja.page').then((m) => m.LojaPage),
  },
  {
    path: 'home',
    canActivate: [loginGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalhes-jogo/:id',
    loadComponent: () =>
      import('./pages/detalhes-jogo/detalhes-jogo.page').then(
        (m) => m.DetalhesJogoPage
      ),
  },
  {
    path: 'play-later',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/play-later/play-later.component').then(
        (m) => m.PlayLaterComponent
      ),
  },
  {
    path: 'currently-playing',
    loadComponent: () =>
      import('./pages/currently-playing/currently-playing.component').then(
        (m) => m.CurrentlyPlayingComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'played',
    loadComponent: () =>
      import('./pages/played/played.component').then((m) => m.PlayedComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'completed',
    loadComponent: () =>
      import('./pages/completed/completed.component').then(
        (m) => m.CompletedComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: 'profile',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
];
