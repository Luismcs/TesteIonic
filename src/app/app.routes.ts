import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'loja',
    loadComponent: () => import('./pages/loja/loja.page').then( m => m.LojaPage)
  },
  {
    path: 'detalhes-jogo/:id',
    loadComponent: () => import('./pages/detalhes-jogo/detalhes-jogo.page').then( m => m.DetalhesJogoPage)
  },

];
